<script lang="ts">
  import { closeTodoItem, deleteTodoItem } from "./main";
  import TodoistSettings from "./todoistSettings.svelte";
  import CreateTodoPage from "./manageTodoPage.svelte";
  window.addEventListener(
    "addTodo",
    (args) => {
      //@ts-ignore: "args.options"
      router.to("addTodo", args.options);
    },
    false,
  );

  let router = {
    route: "main",
    data: null,
    to: (location: string, data?: any) => {
      router.route = location;
      router.data = data;
      if (location === "addTodo" || location === "editTodo") {
        scrollTo(0, 0);
      }
    },
  };

  function getDateAt0(date: string | number | Date) {
    let newDate = new Date(date);

    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate.valueOf();
  }
  let sorted;
  let chromeSyncTodos: { [key: string]: todoItem } = {};
  let moodleCalTodos: { [key: string]: todoItem } = {};
  $: sorted = sortTodos({ ...chromeSyncTodos, ...moodleCalTodos });

  function sortTodos(Todos: { [key: string]: todoItem }): {
    [key: string]: todoItem[];
  } {
    const sortedObject: { [key: number]: todoItem[] } = {};
    Object.keys(Todos).forEach((key) => {
      if (
        Todos[key].deleted === true ||
        (Todos[key]?.isMoodle &&
          Todos[key]?.time !== false &&
          getDateAt0(new Date(Todos[key]?.time).valueOf()) <
            getDateAt0(Date.now()))
      ) {
        delete Todos[key];
        return;
      }
      let todo = Todos[key];
      /* eslint-disable-next-line*/
      var keyToPushTo = "";
      if (todo.time !== false) {
        keyToPushTo = getDateAt0(todo.time).toString();
      } else {
        keyToPushTo = "no-date";
      }

      if (sortedObject[keyToPushTo] == null) {
        sortedObject[keyToPushTo] = [];
      }
      todo["key"] = key;
      sortedObject[keyToPushTo].push(todo);
    });
    Object.keys(sortedObject).forEach((item) => {
      sortedObject[item] = sortedObject[item].sort(
        (a: todoItem, b: todoItem) => {
          if (a.time && b.time) {
            return new Date(a.time).valueOf() - new Date(b.time).valueOf();
          }
        },
      );
    });
    //#region Sort By Date
    let sortedObjectKeys = Object.keys(sortedObject);
    sortedObjectKeys = sortedObjectKeys.sort((a, b) => {
      return parseInt(a) - parseInt(b);
    });
    const finalSorted = {};
    sortedObjectKeys.forEach((item) => {
      finalSorted[item] = sortedObject[item];
    });
    //#endregion

    return finalSorted;
  }
  let getTodos = () => {
    // getEvents().then((Todos) => {
    //   Object.keys(Todos).forEach((todoKey) => {
    //     if (
    //       getDateAt0(new Date(Todos[todoKey]?.time).valueOf()) <
    //         getDateAt0(Date.now()) &&
    //       Todos[todoKey].done
    //     ) {
    //       deleteTodoItem(todoKey);
    //       // Remove from Object,so the user doesn't see it
    //       delete Todos[todoKey];
    //     }
    //   });
    chrome.storage.local.get(
      ["todos", "todos-moodle"],
      (values: extension.storage.local) => {
        chromeSyncTodos = cleanTodoList({
          ...values.todos,
        });
        moodleCalTodos = cleanTodoList({ ...values["todos-moodle"] });
        getEvents().then((value) => {
          moodleCalTodos = cleanTodoList({ ...value });
        });
      },
    );
  };
  getTodos();
  chrome.storage.onChanged.addListener((changes) => {
    getTodos();
    Object.keys(changes).forEach((key) => {
      if (key === "todo-prio") {
        prioData = changes[key].newValue;
      }
    });
  });
  /**
   * Entfernt alte Todos
   */
  function cleanTodoList(list: { [key: string]: todoItem }): {
    [key: string]: todoItem;
  } {
    Object.keys(list).forEach((todoKey) => {
      if (
        !list[todoKey]?.isMoodle &&
        list[todoKey].done !== false &&
        list[todoKey]?.time !== false &&
        getDateAt0(new Date(list[todoKey]?.time).valueOf()) <
          getDateAt0(Date.now())
      ) {
        closeTodoItem(todoKey);
        // Remove from Object,so the user doesn't see it
        delete list[todoKey];
      }
    });
    return list;
  }
  let headerText = (time: number) => {
    if (time === getDateAt0(Date.now())) {
      return "Heute";
    } else if (
      time ===
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1,
      ).valueOf()
    ) {
      return "Gestern";
    } else if (
      time ===
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
      ).valueOf()
    ) {
      return "Morgen";
    } else if (time > Date.now()) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = getDateAt0(Date.now());
      const secondDate = getDateAt0(time);

      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      return `In ${diffDays} Tagen`;
    } else if (time < Date.now()) {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = getDateAt0(time);
      const secondDate = getDateAt0(Date.now());

      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      return `Vor ${diffDays} Tagen`;
    } else {
      return "ERROR";
    }
  };

  function getHeaderWeekday(time: number) {
    const Wochentage = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return Wochentage[new Date(time).getDay()];
  }

  import TodoListItem from "./todoListItem.svelte";
  import { getCalData, getEvents } from "./ts/moodleCal";
  import { defaultTaskPrio } from "@/shared/defaults";

  let prioData: taskPriorities = defaultTaskPrio;
  chrome.storage.sync.get("todo-prio", (values: extension.storage.sync) => {
    //Should not fail... But if it does, there is a check
    values["todo-prio"] && (prioData = values["todo-prio"]);
  });
</script>

<div class="card-body p-3">
  <!-- {JSON.stringify(router)} -->
  {#if router.route === "main"}
    <div
      style="display: flex; justify-content: space-between; align-items: center;"
    >
      <h5 style="margin: 0px;">Todos</h5>
      <div>
        <div
          class="btn btn-secondary"
          on:click={() => {
            router.to("todoistSettings");
          }}
        >
          <i class="fa fa-cog" />
        </div>
        <div
          class="btn btn-secondary"
          on:click={() => {
            router.to("addTodo");
          }}
        >
          <i class="fa fa-plus" />
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column">
      {#if sorted}
        {#each Object.keys(sorted) as date}
          <div
            class="MoodleHelperTodoDateHeader"
            style="font-weight: bold; margin-top: 15px; margin-bottom: 5px; font-size:1.15em; "
          >
            {headerText(parseInt(date))}, {getHeaderWeekday(parseInt(date))}. {new Date(
              parseInt(date),
            ).getDate()}.{new Date(parseInt(date)).getMonth() + 1}
          </div>
          {#each sorted[date] as todo, index}
            <TodoListItem
              {prioData}
              todoItem={sorted[date][index]}
              key={sorted[date][index].key}
              on:todoClick={(e) => router.to("editTodo", sorted[date][index])}
            />

            {#if index !== sorted[date].length - 1}
              <hr style="margin: 2.5px 0px; width: 0" />
            {/if}
          {/each}
        {:else}
          <em>Keine Todos</em>
        {/each}
      {:else}
        Nichts gefunden
      {/if}
    </div>
  {:else if router.route === "addTodo"}
    <CreateTodoPage
      action="create"
      routerData={router.data}
      on:back={() => {
        router.to("main");
      }}
      on:saved={() => {
        router.to("main");
        getTodos();
      }}
    />
  {:else if router.route === "editTodo"}
    <CreateTodoPage
      action="edit"
      routerData={router.data}
      on:back={() => {
        router.to("main");
      }}
      on:saved={() => {
        router.to("main");
        getTodos();
      }}
    />
  {:else if router.route === "todoistSettings"}
    <TodoistSettings
      on:back={() => {
        router.to("main");
      }}
    />
  {:else}
    404 - (╯°□°）╯︵ ┻━┻)
    <button
      on:click={() => {
        router.to("main");
      }}>RESET</button
    >
  {/if}
</div>

<style>
</style>
