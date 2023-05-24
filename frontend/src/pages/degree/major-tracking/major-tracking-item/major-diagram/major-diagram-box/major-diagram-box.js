import { Checkbox, Tooltip } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';
import { UserContext } from '~/pages/degree/degree';
import { selectCourse } from '~/services';

function MajorDiagramBox({ courses, level, requireCount, type }) {
    const { profile, setProfile } = useContext(UserContext);
    const filteredCourse = useMemo(
        () => courses.filter((v) => v.level === level)
        , [courses, level]);

    const isTop = level % 2 !== 0;

    const isChecked = useMemo(() => {
        let count = requireCount;

        for (const c of filteredCourse) {
            if (profile.selectedCourses.some((item) => item._id === c._id)) {
                count -= 1;
                if (count <= 0) return true;
            }
        }
        return false;
    }, [profile.selectedCourses, courses]);

    const colorCode = isChecked ? "#55BB89" : "#0069D5";

    const onChecboxChange = async (course, action) => {
        await selectCourse({
            courseId: course._id,
            action
        });

        const newSelectedCourses = action === 'remove' ? profile.selectedCourses.filter(v => v._id !== course._id) : [...profile.selectedCourses, course]
        setProfile(p => ({ ...p, selectedCourses: newSelectedCourses }));
    };

    return (
        <div className='flex relative'>
            <div style={{
                width: 60,
                height: 0,
                marginTop: 33,
                borderTop: level !== 1 ? 'solid 2px blue' : 'unset'
            }} />
            <div className="border-2 border-solid w-20 rounded-lg text-center p-2"
                style={{
                    width: 190,
                    height: 66,
                    color: "white",
                    borderColor: colorCode,
                    background: colorCode,
                }}
            >
                {type} <br /> ({requireCount} required)
            </div>
            <div style={{
                width: 60,
                height: 0,
                marginTop: 33,
                borderTop: level !== 3 ? 'solid 2px blue' : 'unset'
            }} />
            <div
                className={`absolute flex ${isTop ? 'flex-col-reverse' : 'flex-col'}`}
                style={isTop ? {
                    bottom: '66px',
                    marginLeft: "25px",
                } : { top: '66px', marginLeft: "25px", }}
            >
                <div style={{
                    height: 34,
                    borderLeft: 'solid 2px',
                    borderColor: colorCode,
                    width: 0,
                    marginLeft: 125,
                }} />
                <div
                    className='flex flex-col gap-y-4 border-2 border-solid overflow-scroll rounded-lg p-4'
                    style={{
                        width: 250,
                        height: 227,
                        borderColor: colorCode,
                    }}
                >
                    {filteredCourse.map(item =>
                        <Checkbox
                            key={item._id}
                            checked={profile.selectedCourses.some(cc => cc._id === item._id)}
                            onChange={(e) => onChecboxChange(item, e.target.checked ? 'add' : 'remove')}
                        >
                            <Tooltip title={item.name}>
                                <div className='truncate w-48' style={{
                                    color: colorCode,
                                }}>{item.name}</div>
                            </Tooltip>
                        </Checkbox>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MajorDiagramBox;