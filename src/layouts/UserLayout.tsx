import {ReactNode} from "react";
import {useLayout} from "src/@core/hooks/useLayout";
import Layout from "src/@core/layouts/Layout";
import menus from "src/configs/menus";
import {useMediaQuery} from "@mui/material";
import {Theme} from "@mui/material/styles";
import AppBarContent from "src/layouts/components/AppBarContent";

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const {config, saveConfig} = useLayout()

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <Layout
      menu={menus()}
      config={config}
      hidden={hidden}
      saveConfig={saveConfig}
      appBarContent={(props) => <AppBarContent {...props} />}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
