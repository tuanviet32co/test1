import './course-input.css';
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export function CourseInput({ value, onChange }) {
    return (
        <div>
            <Input
                size="large"
                placeholder="Search course"
                prefix={<SearchOutlined className="text-first-default" />}
                value={value}
                onChange={onChange}
                className="border-2 border-first-default rounded-2xl"
            />
        </div>
    );
}
