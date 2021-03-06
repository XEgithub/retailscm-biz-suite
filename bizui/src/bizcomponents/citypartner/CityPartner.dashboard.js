

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './CityPartner.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'


const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(cityPartner)=>{return [
	 ]}

const internalImageListOf = (cityPartner) =>defaultImageListOf(cityPartner,imageList)

const optionList =(cityPartner)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (cityPartner) =>defaultSettingListOf(cityPartner, optionList)
const internalLargeTextOf = (cityPartner) =>{

	return null
	

}







const internalRenderExtraHeader = defaultRenderExtraHeader




const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf

const internalSummaryOf = (cityPartner,targetComponent) =>{
	
	
	const {CityPartnerService} = GlobalComponents
	
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{cityPartner.id}</Description> 
<Description term="名称">{cityPartner.name}</Description> 
<Description term="手机">{cityPartner.mobile}</Description> 
<Description term="城市服务中心">{cityPartner.cityServiceCenter==null?"未分配":cityPartner.cityServiceCenter.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"城市服务中心","retailStoreCityServiceCenter",CityPartnerService.requestCandidateCityServiceCenter,
	      CityPartnerService.transferToAnotherCityServiceCenter,"anotherCityServiceCenterId",cityPartner.cityServiceCenter?cityPartner.cityServiceCenter.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="描述">{cityPartner.description}</Description> 
	
        {buildTransferModal(cityPartner,targetComponent)}
      </DescriptionList>
	)

}


class CityPartnerDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"城市",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'cityPartner'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, potentialCustomerListMetaInfo, potentialCustomerContactListMetaInfo, potentialCustomerCount, potentialCustomerContactCount } = this.props.cityPartner
    if(!this.props.cityPartner.class){
      return null
    }
    const cardsData = {cardsName:"城市合伙人",cardsFor: "cityPartner",cardsSource: this.props.cityPartner,
  		subItems: [
{name: 'potentialCustomerList', displayName:'潜在的客户',type:'potentialCustomer',count:potentialCustomerCount,addFunction: true, role: 'potentialCustomer', metaInfo: potentialCustomerListMetaInfo},
{name: 'potentialCustomerContactList', displayName:'潜在客户联系',type:'potentialCustomerContact',count:potentialCustomerContactCount,addFunction: true, role: 'potentialCustomerContact', metaInfo: potentialCustomerContactListMetaInfo},
    
      	],
  	};
    //下面各个渲染方法都可以定制，只要在每个模型的里面的_features="custom"就可以得到定制的例子
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  cityPartner: state._cityPartner,
}))(Form.create()(CityPartnerDashboard))

