import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'

import StudentPage from './pages/student/StudentPage';
import NoticeBoard from './pages/student/NoticeBoard';
import EventCalendar from './pages/student/EventCalender';
import Message from './pages/student/Message';
import GroupMessage from './pages/student/GroupMessage';

import CreateProject from './pages/projectEvents/CreateProject';
import ViewProject from './pages/projectEvents/ViewProject';

import TeacherNoticePage from './pages/TeacherAllFile/TeacherNoticePage';
import TeacherPage from './pages/TeacherAllFile/TeacherPage';
import TeacherEvent from './pages/TeacherAllFile/TeacherEvent';
import TeacherMessage from './pages/TeacherAllFile/TeacherMessage';

import AdminPage from './pages/Admin/AdminPage';
import AdminAddStudent from './pages/Admin/AdminAddStudent';
import AdminViewStudent from './pages/Admin/AdminViewStudent';
import AdminAddTeacher from './pages/Admin/AdminAddTeacher';

import Idpanel from './pages/student/Idpanel';
import AdminViewTeacher from './pages/Admin/AdminViewTeacher';
import StudentLogin from './pages/student/StudentLogin';
import TeacherLogin from './pages/TeacherAllFile/TeacherLogin';
import AdmitLogin from './pages/Admin/AdmitLogin';

function App() {  

  return (

    <Routes>
      <Route path='/' element={ <HomePage/> } />
      <Route path='/student' element={ <StudentPage/> } />
      <Route path='/student/login' element={ <StudentLogin/> } />
      <Route path='/student/id' element={ <Idpanel/> } />
      <Route path='/student/notice' element={ <NoticeBoard/> } />
      <Route path='/student/event' element={ <EventCalendar/> } />
      <Route path='/student/message' element={ <Message/> } />
      <Route path='/student/groupmessage' element={ <GroupMessage/> } />
      <Route path='/student/projectpartner/viewproject' element={ <ViewProject/> } />
      <Route path='/student/projectpartner/creatingproject' element={ <CreateProject/> } />

      <Route path='/teacher' element={ <TeacherPage/> } />
      <Route path='/teacher/notice' element={ <TeacherNoticePage/> } />
      <Route path='/teacher/event' element={ <TeacherEvent/> } />
      <Route path='/teacher/message' element={ <TeacherMessage/> } />
      <Route path='/teacher/login' element={ <TeacherLogin/> } />


      <Route path='/admin' element={ <AdminPage/> } />
      <Route path='/admin/addstudent' element={ <AdminAddStudent/> } />
      <Route path='/admin/addstudent/view' element={ <AdminViewStudent/> } />
      <Route path='/admin/addteacher' element={ <AdminAddTeacher/> } />
      <Route path='/admin/addteacher/view' element={ <AdminViewTeacher/> } />
      <Route path='/admin/login' element={ <AdmitLogin/> } />


    </Routes>

  )
}

export default App
