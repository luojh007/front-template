import React, { Component } from 'react';

export default class index extends Component {
  render() {
    const html = `<div>
    <div>1、建议进行遗传咨询；</div>
    <div>
      2、建议完善受检者相关临床检查，对受检者父母进行该基因位点验证，以确认变异来源，并对相关家庭成员或
      亲属进行检测；
    </div>
    <div style='font-size: 12px'>
      注：参考基因版本为GRCh37/hg19。**杂合性：杂合变异/缺失/重复、纯合变异/缺失/重复、半合子变异/缺失/重复、未检出。
      <br />
      <div style='text-indent: 2em'>
        **ACMG致病等级：致病变异、疑似致病变异、临床意义未明变异、疑似良性变异、良性变异。
      </div>
      <div style='text-indent: 2em'>
        **遗传模式：AD（常染色体显性遗传）、AR（常染色体隐性遗传）、XLD（X染色体显性遗传）、XLR（X染色体隐性遗传）。
      </div>
    </div>
    <div>
      <div style='font-weight: bold; text-indent: 2em'>
        本检测仅对已知变异点进行筛查，为检测到致病或意思致病变异
      </div>
      <div>
        本检测项目并不能够取代医生的临床检查。请结合受检者到临床表现及其他检测结果综合分析。
      </div>
    </div>
    {/* 检测技术 */}
    <div>
      <div style='font-weight: bold'>1、检测技术局限性</div>
      <div style='text-indent: 2em'>
        本方法以受检者提供的样本中提取的基因组DNA为检测材料，使用超多重PCR技术对目标基因位点进行捕获和富集，富集的目的片段使用高通量测序（NGS）平台进行测序，测序获得的DNA序列与人类基因组hg19参考序列进行比对并对目标区域的覆盖度和测序质量进行评估，对变异进行生物信息学分析和致病性分析。
      </div>
      <div style='text-indent: 2em'>
        本方法仅检测目标基因的已知致病变异，其他遗传变异均不在检测范围内。由于当前检测技术的局限性，即使在检测人员已经认真履行了工作职责和操作规程的前提下，仍可能出现假阴性和假阳性，原因包括但不限于受检者引物结合区域发生变异、PCR扩增偏好性、大片段缺失或重复、嵌合体、近期输血等情况。
      </div>
      <div style='font-weight: bold'>2、临床局限性</div>
      <div style='text-indent: 2em'>
        本报告中所列的疾病相关变异均来自目前已报道的结果，是否发病需结合变异影响、遗传方式、环境因素及临床特征等多因素综合分析。本检测结果仅供参考，不能作为最终诊断结果。如检测出遗传变异，需进行位点验证和其他检测项目确诊。如未检测出遗传变异，则说明在目标区域内的筛查位点存在遗传变异的风险低，但不排除其他区域存在异常的可能性，故不能完全排除个体患某种疾病的可能。临床需结合其他检测项目综合分析判读。检测出与疾病相关的变异也可能无法评估疾病的严重程度及预后。变异的解释及ACMG致病等级均基于当前对疾病的认识和ACMG相关指南，随着研究的深入可能会发生改变。以上结论均为实验室检测数据，仅供临床参考。基因检测技术及相关仪器不隶属于常规临床检测项目，目前主要用于辅助临床诊断或科研等相关目的，本检测结果的解释及疾病的诊断，请咨询相关医院的专科医师。
      </div>
      <div style='font-weight: bold'>备注：</div>
      <div style='-webkit-transform-origin: 100% 100%;text-aligin: center; display: table;font-size:12px;transform: scale(0.9);transform-origin-x:0;-webkit-transform: scale(0.9);-webkit-transform-origin-x: 0;'>
        <div style="display: table-cell;vertical-aligin: middle">
          1.本检测结果只对本次送检样本负责。本中心对以上检测结果保留最终解释权，如有疑义，请在收到结果后的7个工作日内与我们联系。<br/>
          2.本中心对检验结果保密并依法保护受检者隐私，因受检者个人原因出现的信息外泄，本中心不承担相应责任。<br/>
          3.变异的命名参照人类基因组变异学会（HGVS）提供的命名法（http://varnomen.hgvs.org/）。
        </div>  
     
      </div>
    </div>
  </div>`;
    return (
      <div
        style={{
          background: '#016DBB',
          color: 'white',
          WebkitPrintColorAdjust: 'exact',
          colorAdjust: 'exact'
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    );
  }
}
