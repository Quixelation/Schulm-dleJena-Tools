import { fächer, fach } from "./../../../types";
const fächer = {
  Kunst: "🎨",
  Astronomie: "🌌",
  Ethik: "",
  Sport: "🏀",
  Englisch: "",
  Deutsch: "",
  Französisch: "🥖",
  Mathe: "📊",
  Biologie: "🌸",
  Chemie: "🧪",
  Geographie: "🌎",
  Musik: "🎶",
  Physik: "⚛️",
  Sozialkunde: "",
  WR: "📈",
  Geschichte: "",
  Informatik: "👩‍💻",
  DG: "🎭",
};

function findCourses(givenInnerHTML: string): { name: string; id: number }[] {
  const doc = document.createElement("div");
  doc.innerHTML = givenInnerHTML;

  const foundCourses: { name: string; id: number }[] = [];

  doc
    .querySelectorAll(".card-deck .card[data-region='course-content']")
    .forEach((item) => {
      if (
        item.children[1].children[0].children[0].children[1].children[2].getAttribute(
          "data-moodlehelperfilteredname"
        ) != "true" &&
        item.children[1].children[0].children[0].children[1].children[2].classList.contains(
          "multiline"
        )
      ) {
        const name = item.children[1].children[0].children[0].children[1].children[2].textContent.trim();
        console.log(
          item.children[1].children[0].children[0].children[1].children[2]
        );
        const href = (item.children[0] as HTMLLinkElement).href;
        const id = parseInt(href.slice(href.indexOf("id=") + 3));

        if (!foundCourses.find((item) => item.id == id)) {
          foundCourses.push({ name, id });
        }
      }
    });
  return foundCourses;
}

function getAutoCourseName(longName: string): string | null {
  const filtered = Object.keys(fächer).filter((item) =>
    longName.includes(item)
  );

  if (filtered.length === 1) {
    return filtered[0];
  } else {
    return null;
  }
}

function getAutoAssets(courseName: string): string {
  return fächer[courseName];
}

function getRegisteredCourses(): Promise<fächer> {
  return new Promise<fächer>((resolve) => {
    chrome.storage.sync.get("fächer", (val) => {
      console.log(val);
      resolve(val.fächer);
    });
  });
}

function addCourse(params: fach, id: string): Promise<null> {
  if (id == undefined || id == null) {
    alert(
      "Fehler: Keine ID gefunden. Dies ist ein Fehler im Code. Wir bitten um Ihr Verständnis und bitten Sie, den Entwickler zu informieren."
    );
  }
  return new Promise<null>((resolve, reject) => {
    getRegisteredCourses()
      .then((val) => {
        const data: fach = { ...params };
        val[String(id)] = data;
        chrome.storage.sync.set({ fächer: val }, () => {
          resolve(null);
        });
      })
      .catch(reject);
  });
}

function deleteCourse(id: string, callback?: () => null): Promise<null> {
  return new Promise((resolve) => {
    chrome.storage.sync.get("fächer", ({ fächer: fächer }) => {
      console.log(fächer);
      delete fächer[id];
      chrome.storage.sync.set({ fächer }, () => {
        callback();
        resolve(null);
      });
    });
  });
}

function editCourse(
  params: fach,
  id: string,
  callback?: () => null
): Promise<null> {
  return new Promise((resolve) => {
    if (id == undefined || id == null) {
      alert(
        "Fehler: Keine ID gefunden. Dies ist ein Fehler im Code. Wir bitten um Ihr Verständnis und bitten Sie, den Entwickler zu informieren."
      );
    }
    chrome.storage.sync.get("fächer", ({ fächer: fächer }) => {
      console.log(fächer);
      fächer[id] = params;
      chrome.storage.sync.set({ fächer }, () => {
        callback();
        resolve(null);
      });
    });
  });
}

export {
  findCourses,
  getAutoCourseName,
  getAutoAssets,
  getRegisteredCourses,
  addCourse,
  deleteCourse,
  editCourse,
};
