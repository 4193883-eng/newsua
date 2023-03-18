import "./styles/admin.scss";
import tableRow from "./partials/table_row.hbs";

fetch("https://my-json-server.typicode.com/olehhapuk/news_ua_db/posts")
  .then((resp) => resp.json())
  .then((news) => {
    const tbody = document.getElementById("tbody");
    news.forEach((item) => {
      const trimmedItem = {
        ...item,
        title: item.title.slice(0, 50),
        thumbnailUrl: item.thumbnailUrl.slice(0, 50),
        body: item.body.slice(0, 50),
      };
      const result = tableRow(trimmedItem);
      console.log(item);
      console.log(tableRow(item));
      tbody.insertAdjacentHTML("afterbegin", result);
    });
  });
