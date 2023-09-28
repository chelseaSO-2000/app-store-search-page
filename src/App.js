import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import RecomList from "./components/Recommendation/RecomList";
import FreeAppList from "./components/FreeApp/FreeAppList";

const ITEM_PER_PAGE = 10;

function App() {
  const [freeApplications, setFreeApplications] = useState([]);
  const [recommenedApps, setRecommenedApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [keyword, setKeyWord] = useState("");

  useEffect(() => {
    fetch("https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json")
      .then((response) => response.json())
      .then((data) => {
        const items = data.feed.entry;
        setFreeApplications(items);
        // console.log(items[6]);setData
      });

    fetch(
      "https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json"
    )
      .then((response) => response.json())
      .then((data) => {
        const items = data.feed.entry;
        setRecommenedApps(items);
      });
  }, []);

  // useEffect(() => console.log("keyword", keyword), [keyword]);

  // // Logging
  // useEffect(
  //   () => console.log("displayedItems length", displayedItems.length),
  //   [displayedItems]
  // );

  const searchByKeyword = (keyword) => {
    const keywordToLowerCase = keyword.toLowerCase();

    return (item) =>
      item.label?.toLowerCase()?.includes(keywordToLowerCase) ||
      item.category?.toLowerCase()?.includes(keywordToLowerCase) ||
      item.author?.toLowerCase()?.includes(keywordToLowerCase) ||
      item.summary?.toLowerCase()?.includes(keywordToLowerCase);
  };

  // item.label?.includes?.(keyword);

  // const item = {};
  // console.log("item", item);
  // console.log("item.label", item.label);
  // console.log("item.label?.includes", item.label?.includes);
  // console.log("item.label.includes('abc')", item.label.includes("abc"));
  // item.label?.includes // function() {}

  const extractedItems = freeApplications
    .map((item) => ({
      key: item.id.attributes["im:id"],
      icon: item["im:image"][2].label,
      label: item["im:name"].label,
      author: item["im:artist"].label,
      summary: item["summary"].label,
      category: item.category.attributes.label,
    }))
    .filter(searchByKeyword(keyword));

  const extractedRecItems = recommenedApps
    .map((item) => ({
      key: item.id.attributes["im:id"],
      label: item["im:name"].label,
      icon: item["im:image"][2].label,
      category: item.category.attributes.label,
    }))
    .filter(searchByKeyword(keyword));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        currentPage * ITEM_PER_PAGE < extractedItems.length;

      if (isScrolledToBottom) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, extractedItems]);

  useEffect(() => {
    const newDisplayedItems = extractedItems.slice(
      0,
      currentPage * ITEM_PER_PAGE
    );

    if (JSON.stringify(newDisplayedItems) !== JSON.stringify(displayedItems)) {
      setDisplayedItems(newDisplayedItems);
    }
  }, [currentPage, extractedItems, displayedItems]);

  return (
    <div>
      <SearchBar onChange={(v) => setKeyWord(v)} />
      <div style={{ marginLeft: "28px" }}>
        <h1 style={{ fontSize: "48px" }}>推介</h1>
        {extractedRecItems.length > 0 && <RecomList item={extractedRecItems} />}
      </div>
      <FreeAppList item={displayedItems} />
    </div>
  );
}

export default App;
