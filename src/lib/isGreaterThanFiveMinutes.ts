import moment from "moment";

export function isGreaterThan5Minutes(timestamp: Date): boolean {
  // Calculate the difference in minutes

  const currentDateAndTime = moment(new Date());

  const givenTimestamp = moment(timestamp);

  console.log(currentDateAndTime.diff(givenTimestamp, "minutes"));
  // Check if the difference is greater than 5 minutes
  return currentDateAndTime.diff(givenTimestamp, "minutes") > 5 ? true : false;
}
