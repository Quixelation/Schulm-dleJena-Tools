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

function getEvents(): Promise<todoItem[]> {
  return new Promise((resolve, reject) => {
    getCalData().then((fetchResult) => {
      const events: todoItem[] = [];
      fetchResult[0].data.weeks.forEach((week) => {
        week.days.forEach((day) => {
          day.events.forEach((event) => {
            events.push({
              title: event.name,
              course: event.course,
              time: new Date(event.timestart * 1000).toISOString(),
              color: "#ffee00",
              done: false,
              moodleEvent: true,
            });
          });
        });
      });
      resolve(events);
    });
  });
}

export { getCalData, getEvents };
