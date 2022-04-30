import React, { useState } from "react";
import img from "../img/profile_none.PNG";

import Modal from "./Modal";
import "./ActorList.css";

function ActorList({ movieActor, IMG_URL, openModal, setActorId }) {
  const [click, setClick] = useState(false);

  const actor1 = movieActor.slice(0, 8);
  const actor2 = movieActor.slice(9);

  const onClick = () => {
    setClick(!click);
  };

  const Actor = ({ data }) => {
    return (
      <>
        {data.map((data) => (
          <ActorOne
            key={data.id}
            data={data}
            IMG_URL={IMG_URL}
            openModal={openModal}
            setActorId={setActorId}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="actor">
        <Actor data={actor1} />
        {click ? <Actor data={actor2} /> : null}
      </div>
      <div className="moreBtn">
        {actor2.length > 0 ? (
          <button onClick={onClick}> {click ? "닫기" : "더보기"}</button>
        ) : null}
      </div>
    </>
  );
}

export default ActorList;

export const ActorOne = ({ data, IMG_URL, openModal, setActorId, onModal }) => {
  const modal = () => {
    openModal(true);
    setActorId(data.id);
  };

  return (
    <div className="actorOne" key={data.id}>
      <div
        className="actorImg"
        onClick={onModal ? null : modal}
        style={{
          backgroundImage:
            data.profile_path === null
              ? `url(${img})`
              : `url(${IMG_URL}w200${data.profile_path})`,
        }}
      ></div>
      <div className="actorName">
        <div>{data.name}</div>
        <p>{data.character}</p>

        <span>{data.birthday}</span>
        <span>{data.place_of_birth}</span>
      </div>
    </div>
  );
};
