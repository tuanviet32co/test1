import React from 'react';
import MajorDiagramBox from './major-diagram-box/major-diagram-box';

function MajorDiagram({ courses }) {
  return (
    <div className="p-72 flex justify-center bg-white">
      <MajorDiagramBox courses={courses} level={1} requireCount={4} type="Foundation Courses" />
      <MajorDiagramBox courses={courses} level={2} requireCount={4} type="Intermediate Courses" />
      <MajorDiagramBox courses={courses} level={3} requireCount={3} type="Advanced Courses" />
    </div>
  );
}

export default MajorDiagram;
