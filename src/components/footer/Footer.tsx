

import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa",position: "fixed", bottom:0, width:'100%' }}>
      <Row className="just flex justify-between">
        
          <div className="copyright">
            © 2024
            {" "}
            <a href="#pablo" className="font-weight-bold" target="_blank">
              JamiiPass
            </a>
            
          </div>
       
        
          <div className="footer-menu">
            <ul className="flex gap-4">
            
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#pablo"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
       
      </Row>
    </AntFooter>
  );
}

export default Footer;
