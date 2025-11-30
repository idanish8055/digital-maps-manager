import '../../src/email-template.css'

export const EmailTemplatePreview = ({templateData}) => {
    return(
    <body class="clean-body u_body" style={{margin: "0",padding: "0",WebkitTextSizeAdjust: "100%",backgroundColor: "#ffffff",color: "#000000"}}>
        <div class="ie-container">
        <div class="mso-container">
        <table id="u_body" style={{borderCollapse: "collapse",tableLayout: "fixed",borderSpacing: "0",msoTableLspace: "0pt",msoTableRspace: "0pt",verticalAlign: "top",minWidth: "320px",Margin: "0 auto",backgroundColor: "#ffffff",width:"100%"}} cellpadding="0" cellspacing="0">
        <tbody>
        <tr style={{verticalAlign: "top"}}>
        <td style={{wordBreak: "break-word",borderCollapse: "collapse !important",verticalAlign: "top"}}>
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style={{backgroundColor: "#ffffff"}}>
        

    <div class="u-row-container" style={{padding: "0px",backgroundColor: "transparent"}}>
        <div class="u-row" style={{MarginBottom: "10px",minWidth: "320px",maxWidth: "510px",overflowWrap: "break-word",wordWrap: "break-word",wordBreak: "break-word",backgroundColor: "transparent",}}>
        <div style={{borderCollapse: "collapse",display: "table",width: "100%",height: "100%",backgroundColor: "transparent",}}>
            <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style={{padding: "0px",backgroundColor: "transparent",}} align="center"><table cellpadding="0" cellspacing="0" border="0" style={{width:"500px"}}><tr style={{backgroundColor: "transparent"}}>
            
      <td align="center" width="500" style={{width: "515px",padding: "0px",borderTop: "0px solid transparent",borderLeft: "0px solid transparent",borderRight: "0px solid transparent",borderBottom: "0px solid transparent",}} valign="top"> 
    <div class="u-col u-col-100" style={{maxWidth: "320px",minWidth: "515px",display: "table-cell",verticalAlign: "top"}}>
        <div style={{height: "100%",width: "100% !important",}}>
        <div style={{boxSizing: "border-box", height: "100%", padding: "0px",borderTop: "0px solid transparent",borderLeft: "0px solid transparent",borderRight: "0px solid transparent",borderBottom: "0px solid transparent",}}>
        
    <table style={{fontFamily: "arial,helvetica,sans-serif",}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
            <tr>
                <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                    {/* <img className="h-12" src="backend/assets/maps-logo.png" alt="logo" /> */}
                    <h1 class="v-font-size" style={{margin: "0px", textAlign: "left", wordWrap: "break-word", fontSize: "24px", fontWeight: "400",}}>Maps of the past</h1>
                </td>
            </tr>
            <tr>
                <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}}>
                    <h2 class="v-font-size" style={{margin: "0px", textAlign: "right", fontSize: "16px", fontWeight: "400", color: "grey",}}>ORDER #1001</h2>
                </td>
            </tr>
        </tbody>
    </table>

    <table style={{fontFamily: "arial,helvetica,sans-serif"}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
            <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
            
            <div class="v-font-size" style={{fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                <p style={{lineHeight: "140%"}}>
                    {templateData.message}
                </p>
            </div>

            </td>
        </tr>
        <tr>
            <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                <div class="v-font-size" style={{fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                    <td dangerouslySetInnerHTML={{__html: templateData.important_note}} />
                    {/* {new DOMParser().parseFromString(templateData.important_note, "text/html")} */}
                </div>
            </td>
        </tr>
        <tr>
            <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                <div align="left" style={{width: "100%",}}>  
                    <a href="" target="_blank" class="v-button v-font-size" style={{boxSizing: "border-box",display: "inline-block",fontFamily: "arial,helvetica,sans-serif",textDecoration: "none",WebkitTextSizeAdjust: "none",textAlign: "center",color: "#FFFFFF", backgroundColor: "#9e272d", borderRadius: "4px", fontSize: "12px",}}>
                        <span style={{display: "block",padding: "12px 14px",lineHeight: "120%",}}>View your order</span>
                    </a>
                    <span style={{fontSize: "12px", margin: "5px"}}>or</span>
                    <a href="" target="_blank" class="v-button v-font-size" style={{boxSizing: "border-box",display: "inline-block",fontFamily: "arial,helvetica,sans-serif",textDecoration: "none",WebkitTextSizeAdjust: "none",textAlign: "center",color: "#9e272d", borderRadius: "4px", fontSize: "12px",}}>
                        <span style={{display: "block",lineHeight: "120%",}}>Visit our store</span>
                    </a>
                </div>
            </td>
        </tr>
        <table style={{fontFamily: "arial,helvetica,sans-serif",}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                    <td style={{padding: "40px 0",}}>
                        <table style={{fontFamily: "arial,helvetica,sans-serif"}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                                <tr>
                                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                                        <div class="v-font-size" style={{fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                                        <h2 style={{margin: "0px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word", fontSize: "22px", fontWeight: "400",}}>Order summary</h2>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",borderBottom: "1px solid #dcdcdc",}} align="left">
                                      <div class="v-font-size" style={{display: "flex", flexDirection: "row",fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                                        <div style={{display: "flex", flexDirection: "column", padding: "0 10px",width: "100%",}}>
                                          <div style={{display: "block",width: "100%",}}>
                                            <p style={{lineHeight: "140%",fontSize: "14px",}}>Test Product x 1</p>
                                            <p style={{lineHeight: "140%",fontSize: "10px",color: "grey",display: "block",}}>Digital Download</p>
                                            <p style={{lineHeight: "140%",fontSize: "10px",color: "grey",display: "block",}}>SKU: D-123456</p>
                                          </div>
                                        </div>
                                        <div align="right" style={{width:"100%"}}> 
                                            <a href="" target="_blank" class="v-button v-font-size" style={{boxSizing: "border-box",display: "inline-block",fontFamily: "arial,helvetica,sans-serif",textDecoration: "none",WebkitTextSizeAdjust: "none",textAlign: "center",color: "#FFFFFF", backgroundColor: "#9e272d", borderRadius: "4px", fontSize: "12px",}}>
                                                <span style={{display: "block",padding: "7px 10px",lineHeight: "120%",}}>Download</span>
                                            </a>
                                        </div>
                                      </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>

        <table style={{fontFamily: "arial,helvetica,sans-serif",}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}}>
                        <p style={{color: "#9e272d", lineHeight: "150%", fontSize: "12px", margin: "0", fontStyle: "italic",}}>
                            Note: Your download links will be expired on <span>Tuesday, February 20, 2024 at 1:08:21 AM EST</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}}>
                        <p class="disclaimer__subtext" style={{color: "#999", lineHeight: "150%", fontSize: "12px", margin: "0",borderTopWidth: "1px", borderTopColor: "#dcdcdc", borderTopStyle: "solid",paddingTop: "10px",}}>
                            If you have any questions, reply to this email or contact us at <a style={{fontSize: "12px", textDecoration: "none", color: "#9e272d",}}>info@mapofthepast.com</a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        
        </tbody>
    </table>

        </div> 
        </div>
    </div>
      </td> 
              </tr></table></td></tr></table> 
        </div>
        </div>
    </div>


          </td></tr></table> 
        </td>
        </tr>
        </tbody>
        </table>
        </div> 
        </div> 
    </body>);
}

export const EmailTemplateWildArtsPreview = ({templateData}) => {
    return(
    <body class="clean-body u_body" style={{margin: "0",padding: "0",WebkitTextSizeAdjust: "100%",backgroundColor: "#ffffff",color: "#000000"}}>
        <div class="ie-container">
        <div class="mso-container">
        <table id="u_body" style={{borderCollapse: "collapse",tableLayout: "fixed",borderSpacing: "0",msoTableLspace: "0pt",msoTableRspace: "0pt",verticalAlign: "top",minWidth: "320px",Margin: "0 auto",backgroundColor: "#ffffff",width:"100%"}} cellpadding="0" cellspacing="0">
        <tbody>
        <tr style={{verticalAlign: "top"}}>
        <td style={{wordBreak: "break-word",borderCollapse: "collapse !important",verticalAlign: "top"}}>
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style={{backgroundColor: "#ffffff"}}>
        

    <div class="u-row-container" style={{padding: "0px",backgroundColor: "transparent"}}>
        <div class="u-row" style={{MarginBottom: "10px",minWidth: "320px",maxWidth: "510px",overflowWrap: "break-word",wordWrap: "break-word",wordBreak: "break-word",backgroundColor: "transparent",}}>
        <div style={{borderCollapse: "collapse",display: "table",width: "100%",height: "100%",backgroundColor: "transparent",}}>
            <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style={{padding: "0px",backgroundColor: "transparent",}} align="center"><table cellpadding="0" cellspacing="0" border="0" style={{width:"500px"}}><tr style={{backgroundColor: "transparent"}}>
            
      <td align="center" width="500" style={{width: "515px",padding: "0px",borderTop: "0px solid transparent",borderLeft: "0px solid transparent",borderRight: "0px solid transparent",borderBottom: "0px solid transparent",}} valign="top"> 
    <div class="u-col u-col-100" style={{maxWidth: "320px",minWidth: "515px",display: "table-cell",verticalAlign: "top"}}>
        <div style={{height: "100%",width: "100% !important",}}>
        <div style={{boxSizing: "border-box", height: "100%", padding: "0px",borderTop: "0px solid transparent",borderLeft: "0px solid transparent",borderRight: "0px solid transparent",borderBottom: "0px solid transparent",}}>
        
    <table style={{fontFamily: "arial,helvetica,sans-serif",}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
            <tr>
                <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                    {/* <img className="h-12" src="backend/assets/maps-logo.png" alt="logo" /> */}
                    <h1 class="v-font-size" style={{margin: "0px", textAlign: "left", wordWrap: "break-word", fontSize: "24px", fontWeight: "400",}}>WildArts</h1>
                </td>
            </tr>
            <tr>
                <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}}>
                    <h2 class="v-font-size" style={{margin: "0px", textAlign: "right", fontSize: "16px", fontWeight: "400", color: "grey",}}>ORDER #1001</h2>
                </td>
            </tr>
        </tbody>
    </table>

    <table style={{fontFamily: "arial,helvetica,sans-serif"}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
            <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
            
            <div class="v-font-size" style={{fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                <p style={{lineHeight: "140%"}}>
                    {templateData.message}
                </p>
            </div>

            </td>
        </tr>
        <tr>
            <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                <div class="v-font-size" style={{fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                    <td dangerouslySetInnerHTML={{__html: templateData.important_note}} />
                    {/* {new DOMParser().parseFromString(templateData.important_note, "text/html")} */}
                </div>
            </td>
        </tr>
        <tr>
            <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                <div align="left" style={{width: "100%",}}>  
                    <a href="" target="_blank" class="v-button v-font-size" style={{boxSizing: "border-box",display: "inline-block",fontFamily: "arial,helvetica,sans-serif",textDecoration: "none",WebkitTextSizeAdjust: "none",textAlign: "center",color: "#FFFFFF", backgroundColor: "#000", borderRadius: "4px", fontSize: "12px",}}>
                        <span style={{display: "block",padding: "12px 14px",lineHeight: "120%",}}>View your order</span>
                    </a>
                    <span style={{fontSize: "12px", margin: "5px"}}>or</span>
                    <a href="" target="_blank" class="v-button v-font-size" style={{boxSizing: "border-box",display: "inline-block",fontFamily: "arial,helvetica,sans-serif",textDecoration: "none",WebkitTextSizeAdjust: "none",textAlign: "center",color: "#000", borderRadius: "4px", fontSize: "12px",}}>
                        <span style={{display: "block",lineHeight: "120%",}}>Visit our store</span>
                    </a>
                </div>
            </td>
        </tr>
        <table style={{fontFamily: "arial,helvetica,sans-serif",}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                    <td style={{padding: "40px 0",}}>
                        <table style={{fontFamily: "arial,helvetica,sans-serif"}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                                <tr>
                                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}} align="left">
                                        <div class="v-font-size" style={{fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                                        <h2 style={{margin: "0px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word", fontSize: "22px", fontWeight: "400",}}>Order summary</h2>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",borderBottom: "1px solid #dcdcdc",}} align="left">
                                      <div class="v-font-size" style={{display: "flex", flexDirection: "row",fontSize: "14px", lineHeight: "140%", textAlign: "left", wordWrap: "break-word",}}>
                                        <div style={{display: "flex", flexDirection: "column", padding: "0 10px",width: "100%",}}>
                                          <div style={{display: "block",width: "100%",}}>
                                            <p style={{lineHeight: "140%",fontSize: "14px",}}>Test Product x 1</p>
                                            <p style={{lineHeight: "140%",fontSize: "10px",color: "grey",display: "block",}}>Digital Download</p>
                                            <p style={{lineHeight: "140%",fontSize: "10px",color: "grey",display: "block",}}>SKU: D-123456</p>
                                          </div>
                                        </div>
                                        <div align="right" style={{width:"100%"}}> 
                                            <a href="" target="_blank" class="v-button v-font-size" style={{boxSizing: "border-box",display: "inline-block",fontFamily: "arial,helvetica,sans-serif",textDecoration: "none",WebkitTextSizeAdjust: "none",textAlign: "center",color: "#FFFFFF", backgroundColor: "#000", borderRadius: "4px", fontSize: "12px",}}>
                                                <span style={{display: "block",padding: "7px 10px",lineHeight: "120%",}}>Download</span>
                                            </a>
                                        </div>
                                      </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>

        <table style={{fontFamily: "arial,helvetica,sans-serif",}} role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
                <tr>
                    <td style={{overflowWrap: "break-word",wordBreak: "break-word",padding: "10px",fontFamily: "arial,helvetica,sans-serif",}}>
                        <p class="disclaimer__subtext" style={{color: "#999", lineHeight: "150%", fontSize: "12px", margin: "0",borderTopWidth: "1px", borderTopColor: "#dcdcdc", borderTopStyle: "solid",paddingTop: "10px",}}>
                            If you have any questions, reply to this email or contact us at <a style={{fontSize: "12px", textDecoration: "none", color: "#000",}}>info@wildarts.com</a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
        
        </tbody>
    </table>

        </div> 
        </div>
    </div>
      </td> 
              </tr></table></td></tr></table> 
        </div>
        </div>
    </div>


          </td></tr></table> 
        </td>
        </tr>
        </tbody>
        </table>
        </div> 
        </div> 
    </body>);
}