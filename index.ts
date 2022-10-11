interface RequestTest {
  url: string;
  functionRegion: string;
  firestoreRegion: string;
}

const host = "https://kotaxdev.com";
const requestTests: RequestTest[] = [
  {
    url: `${host}/api/upvote-us?contentPath=i-improve-my-development-process-by-choosing-the-right-javascript-library-with-these-5-tips`,
    functionRegion: "us-central1",
    firestoreRegion: "asia-southeast2",
  },
  {
    url: `${host}/api/upvote?contentPath=i-improve-my-development-process-by-choosing-the-right-javascript-library-with-these-5-tips`,
    functionRegion: "asia-southeast2",
    firestoreRegion: "asia-southeast2",
  },
];
const requestTimes = 10;

const gatherRequest = async (requestTest: RequestTest) => {
  const { url, functionRegion, firestoreRegion } = requestTest;
  const respTimes: number[] = [];
  for (let index = 0; index <= requestTimes; index++) {
    const start = Date.now();
    const resp = await fetch(url);
    const jsonData = await resp.json();
    const end = Date.now();
    const ms = end - start;

    if (!jsonData.success) {
      throw new Error("Failed to get data. Please try again.");
    }

    // Skip cold start
    if (index === 0) {
      continue;
    }

    console.log(`#${index}: ${ms}ms`);
    respTimes.push(ms);
  }
  respTimes.sort((a, b) => a - b);
  const mean = Math.floor(
    respTimes.reduce((a, b) => a + b, 0) / respTimes.length
  );
  const half = Math.floor(respTimes.length / 2);
  const median =
    respTimes.length % 2
      ? respTimes[half]
      : (respTimes[half - 1] + respTimes[half]) / 2.0;

  console.log({
    functionRegion,
    firestoreRegion,
  });
  console.log(`Low: ${respTimes[0]}ms`);
  console.log(`High: ${respTimes[respTimes.length - 1]}ms`);
  console.log(`Median: ${median}ms`);
  console.log(`Mean: ${mean}ms`);
  console.log(`===================================================`);
};

for (let index = 0; index < requestTests.length; index++) {
  const requestTest = requestTests[index];
  await gatherRequest(requestTest);
}
