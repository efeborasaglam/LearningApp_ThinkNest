import React from 'react'
import Dashboard from '@/app/dashboard/Dashboard'
import { useAuth } from '@/lib/AuthContext';

const DashboardPage = () => {
  return(
    <div>
      <Dashboard />
    </div>
  ) 
}

export default DashboardPage
