import React from 'react';
import withFetching from "./WithFetching.jsx";

const NewModalContent = (props) => {
    const {error, isLoading} = props;
    const progDesc = props.data;

    if (error) {
      return <p  style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Ошибка загрузки данных. Описание ошибки: {error.message}</p>;
    }

    if (isLoading || progDesc === null) {
      return <p style={{textAlign: "center", paddingTop: "1rem", paddingBottom: "1rem"}}>Загрузка данных ...</p>;
    }

    return (
      <div>
        <h2>{progDesc.name}</h2>
      </div>
    )
};

export {NewModalContent};
export default withFetching(NewModalContent);
