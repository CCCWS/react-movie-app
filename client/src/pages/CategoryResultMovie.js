import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";

import { IoMdArrowRoundBack } from "react-icons/io";
import "./CategoryResult.css";

function CategoryResultMovie() {
  const nav = useNavigate();
  const { id } = useParams();
  const { value } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [today, setToday] = useState();

  const url = `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_date.lte=${today}&language=ko&with_genres=${id}&page=${page}`;
  const test = `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=primary_release_date.desc&primary_release_date.lte=2022-05-30&language=ko&with_genres=${id}&page=${page}&region=KR`;

  const getApi = async () => {
    if (today === undefined) {
      getToday();
    }
    setLoading(true);
    const res = await (await fetch(url)).json();
    setMovie(res.results);
    setLoading(false);
  };

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }`;
    const day = `${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getMonth()
    }`;

    setToday(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    getApi();
  }, [page, today]);

  const goBack = () => {
    nav(-1);
  };

  return (
    <div className="category-result">
      <div className="goBack" onClick={goBack}>
        <IoMdArrowRoundBack /> {value}
      </div>

      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <MovieCard data={movie} />
        </>
      )}
      <Pagination setPage={setPage} page={page} />
    </div>
  );
}

export default React.memo(CategoryResultMovie);
