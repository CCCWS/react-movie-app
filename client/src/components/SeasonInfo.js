import React, { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";

import "./SeasonInfo.css";

function SeasonInfo({ season, IMG_URL }) {
  const [selectValue, setSelectValue] = useState(0);
  const [click, setClick] = useState(false);

  const select = (event) => {
    setSelectValue(event.target.value);
  };

  const test = () => {
    setClick(!click);
  };

  return (
    <>
      <button onClick={test}>test</button>
      <div className={[`test ${click ? "test2" : null}`]} onClick={test}></div>
      <select className="selectSeason" onChange={select}>
        {season.map((data, index) => (
          <option
            className="selectSeasonOp"
            key={index}
            value={season.indexOf(data)}
          >
            {data.name}
          </option>
        ))}
      </select>

      <div className="seasonBox">
        <div className="seasonImg">
          {season[selectValue].poster_path === null ? (
            <div className="not-seasonImg">
              <InfoCircleOutlined />
            </div>
          ) : (
            <img src={`${IMG_URL}w500${season[selectValue].poster_path}`} />
          )}
        </div>

        <div className="seasonInfo">
          <div className="seasonName">{season[selectValue].name}</div>

          <div className="seasonDate">
            {`${
              season[selectValue].air_date === null
                ? "미정"
                : season[selectValue].air_date
            } / ${season[selectValue].episode_count} 에피소드`}
          </div>

          <div>
            {season[selectValue].overview == "" ? (
              <p className="notInfo"> 정보가 없습니다. </p>
            ) : (
              <>
                <div className="seasonOverview">
                  {season[selectValue].overview}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SeasonInfo;