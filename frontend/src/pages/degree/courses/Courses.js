import './Courses.css';
import React, { useCallback, useEffect, useState } from 'react';
import { CourseFilter } from './course-filter/CourseFilter';
import { CourseList } from './course-list/course-list';
import { CourseInput } from './course-input/course-input';
import { Layout, Menu, Col, Row, Pagination, Divider, Tabs } from 'antd';
import { getCourses, getFilterOptions } from '~/services';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

function debounce(func, timeout = 350) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function Courses() {
  const [searchInput, setSearchInput] = useState('');
  const [isMyCourses, setIsMyCourses] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState();
  const [courses, setCourses] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({ terms: [], majors: [], categories: [] });

  const handleSearch = useCallback(
    debounce(async (q) => {
      const filterParsed = {};
      Object.entries(selectedFilters).forEach(([key, value]) => {
        if (value) filterParsed[key] = value.join(',');
      });
      const coursesRes = await getCourses({
        page,
        pageSize,
        q,
        isSelected: isMyCourses,
        ...filterParsed,
      });
      setTotal(coursesRes.total);
      setCourses(coursesRes.docs);
    }, 500),
    [page, pageSize, selectedFilters, isMyCourses],
  );

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput.trim(), handleSearch]);

  const onPaginationChange = (p, pz) => {
    setPage(pz !== pageSize ? 1 : p);
    setPageSize(pz);
  };

  useEffect(() => {
    const getOptions = async () => {
      const res = await getFilterOptions();
      res && setFilterOptions(res);
    };
    getOptions();
  }, []);

  const handleSelectedFiltersChange = (v) => {
    setPage(1);
    setSelectedFilters(v);
  };

  return (
    <Layout className="bg-white ml-0">
      {/* <Header className="p-0 border-0">
                <Menu
                    className="flex flex-row flex-1 bg-white border-0 text-first-default text-3xl font-bold justify-between items-center hover:text-second-default"
                    mode="horizontal"
                >
                    <NavLink to="/courses">
                        <Menu.Item className="menu-item">Course Offerings</Menu.Item>
                    </NavLink>
                    <NavLink to="/" className="menu-item">
                        <Menu.Item className="menu-item">My Courses</Menu.Item>
                    </NavLink>
                </Menu>
            </Header> */}
      <Tabs
        defaultActiveKey="courses"
        centered
        items={[
          {
            label: `Course Offerings`,
            key: 'courses',
          },
          {
            label: `My Courses`,
            key: 'my_courses',
          },
        ]}
      />

      <div className="p-8 text-first-default">
        <Row gutter={24}>
          <Col span={16}>
            <div className="px-4">
              <CourseInput value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <CourseList total={total} />
              <Divider className="bg-first-default my-2" />
              <CourseList courses={courses} />
            </div>
            <div className="flex flex-row justify-center px-4">
              <Pagination
                className="text-first-default"
                current={page}
                total={total || 0}
                showSizeChanger
                pageSize={pageSize}
                pageSizeOptions={['10', '20']}
                onChange={onPaginationChange}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              />
            </div>
          </Col>
          <Col className="bg-second rounded-3xl border-2 border-first-default w-max h-max p-4" span={8}>
            <p className="text-xl font-bold leading-10">Filters</p>
            <CourseFilter
              filterOptions={filterOptions}
              selectedFilters={selectedFilters}
              onSelectedFiltersChange={handleSelectedFiltersChange}
              isMyCourses={isMyCourses}
              onIsMyCourses={setIsMyCourses}
              className="text-first-default"
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Courses;
