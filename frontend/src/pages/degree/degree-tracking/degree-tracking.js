import { Avatar, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useContext, useMemo } from 'react';
import infoBackgroundPng from '~/assets/info_background.png';
import avatarJpeg from '~/assets/avatar.jpeg';
import { UserContext } from '../degree';


function ProgressItem({ text, target, count }) {
  return (
    <div>
      <div className='flex justify-between'><div>{text}</div><div>{count} / {target}</div></div>
      <Progress
        percent={100 * count / target}
        strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
        showInfo={false}
        strokeWidth={12}
        style={{ height: '35px' }}
      />
    </div>
  )
}

function DegreeTracking() {
  const { profile, categoriesOptions } = useContext(UserContext);
  const {
    email,
    name,
    studentId,
    graduationYear,
    selectedCourses,
    major,
    minor,
  } = profile;


  const categoryMap = useMemo(() => {
    let core = [];
    let cE = [];
    let cEL = [];
    categoriesOptions.forEach((cc) => {
      if (cc.label.includes('Core')) {
        core.push(cc.value);
        return;
      }
      if (cc.label.includes('Exploratory')) {
        cE.push(cc.value);
        return;
      }
      if (cc.label.includes('Experiential')) {
        cEL.push(cc.value);
        return;
      }
    })

    return { core, cE, cEL };
  }, [categoriesOptions]);

  const progressData = useMemo(() => {
    const { core, cE, cEL } = categoryMap;
    let coreCount = 0;
    let cECount = 0;
    let cELCount = 0;

    (selectedCourses || []).forEach((cc) => {
      if (cc.category.some((item) => core.includes(item))) {
        coreCount++;
        return;
      }
      if (cc.category.some((item) => cE.includes(item))) {
        cECount++;
        return;
      }
      if (cc.category.some((item) => cEL.includes(item))) {
        cELCount++;
        return;
      }
    })

    return { coreCount, cECount, cELCount }
  }, [selectedCourses, categoryMap]);

  const rate = Math.round((100 * ((selectedCourses || []).length * 4) / 144));

  return (
    <div className='grid grid-cols-3 min-h-screen'>
      <div className='col-span-3 md:col-span-2 p-12'>
        <div className='mt-14'>
          <div className='flex items-center justify-center'>
            <Progress size={150} strokeWidth={12} type="circle" percent={(rate > 100 ? 100 : rate)} />
            <div className='text-2xl ml-6'>
              <span className=' text-second'>{(selectedCourses?.length || 0) * 4}</span> / <span className='text-first-default'>{144}</span>
              <div className='text-lg'>Credits</div>
            </div>
          </div>
        </div>

        <div className='mt-10'>
          <div className='text-lg text-first-default py-3'>Details</div>
          <ProgressItem text="Core Courses" count={progressData.coreCount} target={20} />
          <ProgressItem text="Exploratory Courses" count={progressData.cECount} target={20} />
          <ProgressItem text="Experiential Learning" count={progressData.cELCount} target={2} />
        </div>
      </div>
      <div
        className='col-span-3 md:col-span-1 bg-cover bg-center text-white flex flex-col justify-between p-6'
        style={{
          backgroundImage: `url(${infoBackgroundPng})`
        }}
      >
        <div className='top-component'>
          <div>Good morning,</div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Avatar size={100} src={avatarJpeg} icon={<UserOutlined />} />
          <div className=' text-2xl mt-3'>{name}</div>
          <div className='mt-2'>{email}</div>
          <div className='mt-2'>Student Id: {studentId}</div>
        </div>

        <div className="bg-white rounded-xl p-6 mx-4" style={{ color: '#0069d5' }}>
          <div>
            <div className='text-sm'>Expected Graduation</div>
            <div className='text-lg'>{graduationYear}</div>
          </div>
          <div className='mt-2'>
            <div className='text-sm'>Major</div>
            <div className='text-lg'>{major?.name}</div>
          </div>
          <div className='mt-2'>
            <div className='text-sm'>Minor</div>
            <div className='text-lg'>{minor?.name}</div>
          </div>
        </div>
        <div className='w-full text-center'>Made by Lan Phuc, Phuong Anh, Diem Quynh</div>
      </div>
    </div>
  );
}

export default DegreeTracking;