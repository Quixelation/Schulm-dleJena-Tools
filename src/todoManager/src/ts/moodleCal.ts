const sessionKey = new URL(
  (
    document.querySelector(
      ".usermenu .dropdown div[data-rel='menu-content'] > a:last-child",
    ) as HTMLAnchorElement
  ).href,
).searchParams.get("sesskey");

function getCalData(): Promise<calData.result> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://moodle.jsp.jena.de/lib/ajax/service.php?sesskey=${sessionKey}&info=core_calendar_get_calendar_monthly_view`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            index: 0,
            methodname: "core_calendar_get_calendar_monthly_view",
            args: {
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              courseid: 1,
              categoryid: 0,
              includenavigation: true,
              mini: true,
              day: new Date().getDate(),
            },
          },
        ]),
      },
    )
      .then((response) => response.json(), reject)
      .then(resolve);
  });
}

function getCoursesData(): Promise<fächer> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["fächer"], (values: extension.storage.sync) => {
      resolve(values.fächer);
    });
  });
}

function getEvents(): Promise<{ [key: string]: todoItem }> {
  return new Promise((resolve) => {
    Promise.all([getCalData(), getCoursesData()]).then((promisesResult) => {
      const events: { [key: string]: todoItem } = {};
      promisesResult[0][0].data.weeks.forEach((week) => {
        week.days.forEach((day) => {
          day.events.forEach((event: calData.event) => {
            const thisCourse = promisesResult[1][event.course.id];
            events[event.id] = {
              title: event.name,
              isMoodle: true,
              time: new Date(event.timestart * 1000).toISOString(),
              moodleUrl: event.url,
              done: false,
              course: {
                auto: true,
                id: event.course.id,
                name: thisCourse?.short,
                color: thisCourse?.color,
                emoji: thisCourse?.emoji,
                imageType: thisCourse?.imageType,
                long: thisCourse?.long,
                short: thisCourse?.short,
              },
            } as todoItem;
          });
        });
      });
      console.log(events);
      chrome.storage.local.set({ "todos-moodle": events });
      resolve(events);
    });
  });
}

export { getCalData, getEvents };
