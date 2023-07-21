const { default: axios } = require("axios");

const getShortTermRegId = async (str) => {
  try {
    const response = await axios.get(
      encodeURI(
        `https://apihub.kma.go.kr/api/typ01/url/fct_shrt_reg.php?tmfc=0&authKey=bkPKWXM3RQmDyllzN-UJmA`
      ),
      { responseType: "arraybuffer", responseEncoding: "binary" }
    );
    const decoder = new TextDecoder("euc-kr");
    const content = decoder.decode(response.data);
    let arr = [];
    let data = content.split("\n");

    for (let i = 11; i < data.length; i++) {
      let temp = data[i].split(" ");
      for (s of str) {
        if (s.includes(temp[9])) {
          arr.push([temp[0], temp[9]]);
        }
      }
    }
    return arr;
  } catch (e) {
    console.log(e);
  }
};
const getShortTermData = async (regId) => {
  try {
    const response = await axios.get(
      encodeURI(
        `https://apihub.kma.go.kr/api/typ01/url/fct_afs_dl.php?reg=${regId}&disp=0&help=0&authKey=muOqY1EjRTajqmNRI7U20g`
      ),
      { responseType: "arraybuffer", responseEncoding: "binary" }
    );
    const decoder = new TextDecoder("euc-kr");
    const content = decoder.decode(response.data);
    let arr = [];
    let data = content.split(`\n`);
    for (let i = 2; i <= data.length - 3; i++) {
      let [
        regId,
        TM_FC,
        TM_EF,
        MOD,
        NE,
        STN,
        C,
        MAN_ID,
        MAN_FC,
        W1,
        T,
        W2,
        TA,
        ST,
        SKY,
        PREP,
        WF,
        WF2,
        WF3,
      ] = data[i].split(" ").filter((str) => str.length > 0);
      let W = (WF || " ") + (WF2 || " ") + (WF3 || "");
      let temp = {
        regId,
        TM_FC,
        TM_EF,
        MOD,
        NE,
        STN,
        C,
        MAN_ID,
        MAN_FC,
        W1,
        T,
        W2,
        TA,
        ST,
        SKY,
        PREP,
        W,
      };
      arr.push(temp);
    }

    return arr;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getShortTermData,
  getShortTermRegId,
};
