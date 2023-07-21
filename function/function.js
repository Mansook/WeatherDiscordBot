const date = (str) => {
  let year = str.substr(0, 4);
  let month = str.substr(4, 2);
  let day = str.substr(6, 2);
  let time = str.substr(8, 2);
  return { year, month, day, time };
};

const weatherImo = (sky, prep) => {
  if (prep == 0) {
    //비 안와
    if (sky === "DB01") return ":sunny:"; //맑음
    if (sky === "DB02") return ":white_sun_small_cloud:"; //구름조금
    if (sky === "DB03") return ":white_sun_cloud:"; //구름많음
    if (sky === "DB04") return ":cloud:"; //흐림
  } else if (prep == 1) {
    if (sky === "DB01" || sky === "DB02") return ":white_sun_rain_cloud:";
    else return ":cloud_rain:";
    //비
  } else return ":cloud_snow:";
};

const calDay = (year, month, day) => {
  console.log("year:" + year + "month" + month + "day" + day);

  let arr = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
  let d = ["토", "일", "월", "화", "수", "목", "금"];
  var a = (Number(day) + Number(arr[month - 1])) % 7;

  var b = (year % 100) % 7;

  var c = parseInt((year % 100) / 4);

  return d[(a + b + c) % 7];
};
module.exports = { calDay, date, weatherImo };
