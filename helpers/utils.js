function correctDate(date) {
  return new Date(
    Date.parse(date.toUTCString()) - date.getTimezoneOffset() * 60000
  );
}

export { correctDate };
