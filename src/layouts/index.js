import React, {useEffect, useState, useMemo} from 'react';

import styled, { keyframes } from 'styled-components';
import { Link } from 'umi';
import { Wallet, getSelectedAccount, getSelectedAccountWallet, WalletButton } from "wan-dex-sdk-wallet";
import "wan-dex-sdk-wallet/index.css";
import { withRouter } from 'umi';
import { connect } from 'react-redux';
import { getNodeUrl, isSwitchFinish, getFastWeb3 } from '../utils/web3switch.js';
import { useIntl } from 'umi';

function BasicLayout(props) {
  const [rpc, setRpc] = useState(undefined);
  const intl = useIntl();
  console.log('intl', intl);
  useEffect(() => {
    const func = async () => {
      await getFastWeb3();
      setRpc(getNodeUrl());
    }
    func();
  }, []);

  return (
    <Ground>
      {
        rpc
        ? <Wallet title="WanSwap" nodeUrl={rpc} />
        : null
      }

      <TopBar>
        <Logo>
        🏵
        </Logo>
        {
          rpc
          ? <WalletBt><WalletButton /></WalletBt>
          : null
        }
      </TopBar>
    </Ground>
  );
}

export default withRouter(connect(state => {
  const selectedAccountID = state.WalletReducer.get('selectedAccountID');
  return {
    selectedAccount: getSelectedAccount(state),
    selectedWallet: getSelectedAccountWallet(state),
    networkId: state.WalletReducer.getIn(['accounts', selectedAccountID, 'networkId']),
    selectedAccountID,
  }
})(BasicLayout));

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Ground = styled.div`
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(155, 200, 200, 1) 50%,
    rgba(255, 200, 200, 1) 100%
  );
  background-size: 400% 400%;
  background-position: 50%;
  /* animation: ${RainbowLight} 20s linear infinite; */
  height: 100%;
  width: 100%;
  /* padding-bottom: 40px; */
`;

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #00000020;
  margin: 0px;
  display:flex;
  justify-content: start;
`;

const Logo = styled.div`
  padding: 6px;
  margin-right: 40px;
  font-size: 32px;
  margin-left: 10px;
`;

const Tab = styled(Link)`
  width: 80px;
  padding: 8px;
  margin: 6px;
  font-size: 22px;
  font-weight: ${props=>props.select?"bold":"normal"};
  color: ${props=>props.select?"#ffffffff":"#ffffffbb"};
`;


export const WalletBt = styled.div`
  border: 1px solid white;
  border-radius: 25px;
  margin: 12px;
  margin-left: auto;
  margin-right: 20px;
  padding: 2px;
  button {
    background: transparent;
    border: none;
    height: 30px;
    /* width: 220px; */
    font-family: Roboto Condensed;
    font-size: 16px;
    :hover {
      background-color: transparent!important;
    }
  }
`;

