import { Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { getCourses } from '~/services';
import { UserContext } from '../../degree';
import MajorDiagram from './major-diagram/major-diagram';
import './major-tracking-item.css';

function MajorTrackingItem({ fieldKey }) {
  const { profile, majorOptions } = useContext(UserContext);
  const [selectedMajor, setSelectedMajor] = useState();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    profile[fieldKey]?._id && setSelectedMajor(profile[fieldKey]?._id);
  }, [profile[fieldKey]?._id]);

  useEffect(() => {
    const loadCourses = async () => {
      const res = await getCourses({ page: 1, pageSize: 100, majors: selectedMajor });
      setCourses(res.docs);
    };
    selectedMajor && loadCourses();
  }, [selectedMajor]);

  const onChange = (v) => {
    setSelectedMajor(v);
  };

  return (
    <>
      <div className='grid grid-cols-1 grid-rows-1 place-items-center mt-4'>
        <Select
          value={selectedMajor}
          showSearch
          placeholder="Select a major"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={majorOptions.filter((v) => v.label !== 'Core')}
          className="w-1/6"
        />
      </div>
      <MajorDiagram courses={courses} />
    </>
  );
}

export default MajorTrackingItem;
