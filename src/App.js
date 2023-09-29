import { useQuery } from "react-query";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import RecomList from "./components/Recommendation/RecomList";
import FreeAppList from "./components/FreeApp/FreeAppList";

const ITEM_PER_PAGE = 10;

function App() {
  let [freeApplications, setFreeApplications] = useState([]);
  const [recommendedApps, setRecommenedApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [keyword, setKeyWord] = useState("");

  // useEffect(() => {
  const fetchFreeAPI = async () => {
    const res = await fetch(
      "https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json"
    );
    const data = await res.json();
    return data;
  };

  const fetchRecomAPI = async () => {
    const res = await fetch(
      "https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json"
    );
    const data = await res.json();
    return data;
  };
  // }, []);

  const { data: FreeAppData, isSuccess: FreeAppIsSuccess } = useQuery(
    "FreeAppAPI",
    fetchFreeAPI,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: RecomAppData, isSuccess: RecomAppIsSuccess } = useQuery(
    "RecomAPI",
    fetchRecomAPI,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (FreeAppIsSuccess && FreeAppData) {
      const freeApplications = FreeAppData.feed.entry;
      setFreeApplications(freeApplications);
    }
  }, [FreeAppIsSuccess, FreeAppData]);

  useEffect(() => {
    if (RecomAppIsSuccess && RecomAppData) {
      const recommendedApps = RecomAppData.feed.entry;
      setRecommenedApps(recommendedApps);
    }
  }, [RecomAppIsSuccess, RecomAppData]);

  const searchByKeyword = (keyword) => {
    const keywordToLowerCase = keyword.toLowerCase();

    return (item) =>
      item.label?.toLowerCase()?.includes(keywordToLowerCase) ||
      item.category?.toLowerCase()?.includes(keywordToLowerCase) ||
      item.author?.toLowerCase()?.includes(keywordToLowerCase) ||
      item.summary?.toLowerCase()?.includes(keywordToLowerCase);
  };

  const extractedItems = useMemo(() => {
    return freeApplications
      .map((item) => ({
        key: item.id.attributes["im:id"],
        icon: item["im:image"][2].label,
        label: item["im:name"].label,
        author: item["im:artist"].label,
        summary: item["summary"].label,
        category: item.category.attributes.label,
      }))
      .filter(searchByKeyword(keyword));
  }, [freeApplications, keyword]);

  const extractedRecItems = useMemo(() => {
    return recommendedApps
      .map((item) => ({
        key: item.id.attributes["im:id"],
        label: item["im:name"].label,
        icon: item["im:image"][2].label,
        category: item.category.attributes.label,
      }))
      .filter(searchByKeyword(keyword));
  }, [recommendedApps, keyword]);

  useEffect(() => {
    const newDisplayedItems = freeApplications
      .map((item) => ({
        key: item.id.attributes["im:id"],
        icon: item["im:image"][2].label,
        label: item["im:name"].label,
        author: item["im:artist"].label,
        summary: item["summary"].label,
        category: item.category.attributes.label,
      }))
      .filter(searchByKeyword(keyword))
      .slice(0, currentPage * ITEM_PER_PAGE);

    if (JSON.stringify(newDisplayedItems) !== JSON.stringify(displayedItems)) {
      setDisplayedItems(newDisplayedItems);
    }
  }, [currentPage, freeApplications, displayedItems, keyword]);

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
