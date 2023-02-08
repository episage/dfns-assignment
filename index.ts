import axios from 'axios';

const dataSourceUrl = `https://api.github.com/search/repositories?q=react`;

type RepoStatistics = {
  name: string,
  numberOfStars: number,
  numberOfForks: number,
}

async function fetchRespositories(): Promise<RepoStatistics[]> {
  const response = await axios.get(dataSourceUrl);

  const statistics = response.data.items.map((item: any) => {
    // todo validate the item record
    const forksCount: number = item.forks_count;
    const starsCount: number = item.stargazers_count;
    const name: string = item.name;

    const returnObject: RepoStatistics = {
      name,
      numberOfForks: forksCount,
      numberOfStars: starsCount,
    }

    return returnObject;
  })

  return statistics;
};



(async function () {
  console.log(`<name> - 🌟 <stars> - 🍴 <forks>`);
  var statistics = await fetchRespositories();
  statistics.forEach(stat => {
    console.log(`${stat.name} - 🌟 ${stat.numberOfStars} - 🍴 ${stat.numberOfForks}`)
  });
})();