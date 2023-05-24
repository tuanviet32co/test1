import './CourseFilter.css';
import React, { useCallback } from 'react';
import { Checkbox } from 'antd';

export function CourseFilter({ filterOptions, selectedFilters, onSelectedFiltersChange, isMyCourses, onIsMyCourses }) {
    const handleSelect = useCallback(
        (key, value) => {
            const val = selectedFilters[key].includes(value)
                ? { ...selectedFilters, [key]: selectedFilters[key].filter((v) => v !== value) }
                : { ...selectedFilters, [key]: [...selectedFilters[key], value] };

            onSelectedFiltersChange(val);
        },
        [selectedFilters, onSelectedFiltersChange],
    );

    const handleCheck = (e) => {
        onIsMyCourses(e.target.checked);
    };
    return (
        <div>
            <Checkbox value={isMyCourses} onChange={handleCheck} className="text-first-default">
                My course only
            </Checkbox>

            {['terms', 'majors', 'categories'].map(
                (key) =>
                    filterOptions[key] &&
                    filterOptions[key].length > 0 && (
                        <>
                            <div className="text-first-default font-semibold capitalize leading-10">{key}</div>
                            {filterOptions[key].map((item) => (
                                <div key={item.value}>
                                    <Checkbox
                                        value={selectedFilters[key].includes(item.value)}
                                        onChange={(_) => handleSelect(key, item.value)}
                                        className="text-first-default leading-6"
                                    >
                                        {item.label}
                                    </Checkbox>
                                </div>
                            ))}
                        </>
                    ),
            )}
        </div>
    );
}
