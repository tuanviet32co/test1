import './course-list.css';
import React, { useCallback, useContext, useMemo } from 'react';
import { selectCourse } from '~/services';
import { UserContext } from '../../degree';
import { Button } from 'antd';

export function CourseItem({ course, onToggle, selectedCourses }) {
    const {
        code,
        name,
        faculty,
        term,
        major,
    } = course;

    const isAdded = useMemo(() => selectedCourses.some((item) => item._id === course._id), [course, selectedCourses]);

    return (
        <div className="flex flex-row flex-1 justify-between items-center bg-second p-4 rounded-2xl my-4">
            <div>
                <div className="font-semibold">
                    {code} {name}
                </div>
                <div>
                    {major.name} • {term.name} • {faculty} {course.credits}
                </div>
            </div>
            {isAdded ? <Button onClick={onToggle} type="primary" danger>Remove</Button>
                : <Button onClick={onToggle} type="primary">Add</Button>
            }
        </div>
    );
}

export function CourseList({ courses, total }) {
    const { profile, setProfile } = useContext(UserContext);
    const getIsAdded = useCallback((courseId) => profile.selectedCourses.some((item) => item._id === courseId), [profile.selectedCourses]);

    const onToggle = async (course) => {
        const isAdd = getIsAdded(course._id);
        const action = isAdd ? 'remove' : 'add';
        await selectCourse({
            courseId: course._id,
            action
        });

        const newSelectedCourses = isAdd ? profile.selectedCourses.filter(v => v._id !== course._id) : [...profile.selectedCourses, course]
        setProfile(p => ({ ...p, selectedCourses: newSelectedCourses }));
    };

    return (
        <div>
            {total && <div className="mt-2">{total} results found</div>}
            {courses &&
                courses.map((c) => (
                    <CourseItem
                        key={c._id}
                        course={c}
                        onToggle={() => onToggle(c)}
                        selectedCourses={profile.selectedCourses}
                    />
                ))}
        </div>
    );
}
