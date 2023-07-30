import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { Layout, CmsLayout } from '../components';
import * as Pages from '../pages';
import AuthRoute from './AuthRoute';
import AdminCheck from './AdminCheck';

const AllRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Normal Users */}
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Pages.home.Home />} />
                    <Route path='/book/:id' element={<Pages.home.Details />}/>

                    <Route path='login' element={<Pages.home.Login />} />
                    <Route path='register' element={<Pages.home.Register />} />              
                </Route>

                {/* Admin Users */}
                <Route path='/cms' element={<CmsLayout />}>
                    <Route path='dashboard' element={<AuthRoute element={<AdminCheck element={<Pages.CMS.dashboard.Dashboard />} />}/>}/>

                    <Route path='books' element={<AuthRoute element={<AdminCheck element={<Pages.CMS.books.ListBook />} />} />} />
                    <Route path='books/add' element={<AuthRoute element={<AdminCheck element={<Pages.CMS.books.AddBook />} />} />} />
                    <Route path='books/:id/edit' element={<AuthRoute element={<AdminCheck element={<Pages.CMS.books.EditBook />} />} />} />

                    <Route path='users' element={<AuthRoute element={<AdminCheck element={<Pages.CMS.users.ListUsers />} />} />}/>
                    <Route path='users/:id/edit' element={<AuthRoute element={<AdminCheck element={<Pages.CMS.users.EditUser />} />} />}/>

                    <Route path='login' element={<Pages.CMS.login.Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default AllRoutes;