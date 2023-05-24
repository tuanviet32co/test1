import './degree.css';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Courses from './courses/Courses';
import MajorTracking from './major-tracking/major-tracking';
import DegreeTracking from './degree-tracking/degree-tracking';
import Settings from './settings/settings';
import { getFilterOptions, getUserProfile, logOut } from '~/services';
import Cookies from 'universal-cookie';
import degreeIcon from '~/assets/degree-icon.svg';
import majorIcon from '~/assets/major-icon.svg';
import coursesIcon from '~/assets/courses-icon.svg';
import settingsIcon from '~/assets/settings-icon.svg';

const cookies = new Cookies();
export const UserContext = React.createContext({});

function Degree() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [majorOptions, setMajorOptions] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
            const prf = await getUserProfile();
            setProfile(prf);
        };

        const loadOptions = async () => {
            const res = await getFilterOptions();
            setMajorOptions(res.majors);
            setCategoriesOptions(res.categories);
        };

        if (cookies.get('TOKEN')) {
            loadOptions();
            getProfile();
        } else {
            navigate('/home');
        }
    }, []);

    return (
        <Layout hasSider className="border-e-0">
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    border: 0,
                }}
                width={100}
            >
                <Menu className="degree-menu">
                    <NavLink to="/degree" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <div className="flex flex-col flex-1 justify-center items-center p-2 mb-2">
                            <img className="p-2 w-16" src={degreeIcon} alt="Major"></img>
                            <p className="p-1 my-1">Degree</p>
                        </div>
                    </NavLink>
                    <NavLink to="/majors" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <div className="flex flex-col flex-1 justify-center items-center my-8">
                            <img className="p-2 w-14" src={majorIcon} alt="Major"></img>
                            <p className="p-1 my-1">Major</p>
                        </div>
                    </NavLink>
                    <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <div className="flex flex-col flex-1 justify-center items-center my-8">
                            <img className="p-2 w-14" src={coursesIcon} alt="Courses"></img>
                            <p className="p-1 my-1">Courses</p>
                        </div>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
                        <div className="flex flex-col flex-1 justify-center items-center p-2 my-8">
                            <img className="p-2 w-14" src={settingsIcon} alt="Settings"></img>
                            <p className="p-1 my-1">Settings</p>
                        </div>
                    </NavLink>
                </Menu>
            </Sider>

            <UserContext.Provider value={{ profile, setProfile, majorOptions, categoriesOptions }}>
                <Layout className="site-layout" style={{ marginLeft: 100 }}>
                    <Routes>
                        <Route path="/degree" element={<DegreeTracking />} />
                        <Route path="/majors" element={<MajorTracking />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Layout>
            </UserContext.Provider>
        </Layout>
    );
}

export default Degree;
