import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { selectPredictionList } from 'src/redux/image/image.selectors';
import { getHoveredFaceId } from 'src/redux/image/image.reducer';
import CroppedFace from 'src/components/cropped-face/cropped-face.component';
import {
  PredictionListContainer,
  PredictionListStyled,
  PredictionListItem,
  PredictionListName,
  PredictionListValue,
} from './prediction-list.styles';

const PredictionList = () => {
  const dispatch = useDispatch();
  const predictions = useSelector(selectPredictionList);

  if (!predictions.length) {
    return <Typography>NO PREDICTIONS</Typography>;
  }

  const handleMouseEnter = (id: string) => {
    dispatch(getHoveredFaceId(id));
  };

  const handleMouseLeave = (id: string) => {
    dispatch(getHoveredFaceId(id));
  };

  return (
    <>
      {predictions.map(({ box, concepts, id: id1 }) => (
        <PredictionListContainer
          key={id1}
          onMouseEnter={() => handleMouseEnter(id1)}
          onMouseLeave={() => handleMouseLeave('')}
        >
          <CroppedFace box={box} />
          <PredictionListStyled>
            {concepts.map(({ id: id2, name, value }) => (
              <PredictionListItem key={id2}>
                <PredictionListName>{name}</PredictionListName>
                <PredictionListValue>{value.toFixed(2)}</PredictionListValue>
              </PredictionListItem>
            ))}
          </PredictionListStyled>
        </PredictionListContainer>
      ))}
    </>
  );
};

export default PredictionList;
