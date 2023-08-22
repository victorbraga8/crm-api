class Helpers {
  dateTimeformater() {
    const date = new Date();
    const formatedDate = [];

    const year = date.getFullYear();
    const nextYear = date.getFullYear() + 1;
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate();

    const withHyphens = [year, month, day].join("-");
    const withHyphensNextYear = [nextYear, month, day].join("-");

    formatedDate.push(withHyphens);
    formatedDate.push(withHyphensNextYear);

    return formatedDate;
  }
}

const helper = new Helpers();
export default helper;
// module.exports = helper;
