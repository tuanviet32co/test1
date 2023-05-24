import { Tabs } from 'antd';
import React from 'react';
import MajorTrackingItem from './major-tracking-item/major-tracking-item';
import './major-tracking.css';

function MajorTracking() {
  return (
    <Tabs
      defaultActiveKey="major"
      centered
      items={[
        {
          label: `Major`,
          key: 'major',
          children: <MajorTrackingItem fieldKey="major" />,
        },
        {
          label: `Minor`,
          key: 'minor',
          children: <MajorTrackingItem fieldKey="minor" />,
        },
      ]}
    />
  );
}

export default MajorTracking;
