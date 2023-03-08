const Dashboard = () => {
  return <div style={{height: '120vh'}}>
    <h1>Dashboard</h1>
  </div>
}

Dashboard.acl = {
  action: 'access',
  subject: 'dashboard',
}

export default Dashboard
