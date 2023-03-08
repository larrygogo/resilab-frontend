import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import Link from "next/link";
import {LayoutConfig} from "src/@core/context/types";
import Image from "next/image";

const NavHeaderWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  minHeight: '64px',
  width: '100%',
  padding: '16px 20px',
})

type Props = {
  hidden: boolean
  config: LayoutConfig
  saveConfig: (values: LayoutConfig) => void
}

const NavHeader = (props: Props) => {
  const {config} = props;

  const {logo} = config;

  return <NavHeaderWrapper>
    <Link href="/" passHref>
      <StyledLink>
        {logo && <Image src={logo} alt="logo" width="100" height="32"/> }
      </StyledLink>
    </Link>
  </NavHeaderWrapper>
}

export default NavHeader
