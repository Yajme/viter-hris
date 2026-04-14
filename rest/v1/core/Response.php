<?php 



class Response {
  private $_success;
  private $_data;
  private $_toCache = false;
  private $_ResponseData = array();
  private $_statusCode;

  public function setSuccess($success) {
    $$this->_success = $success;
  }

  public function setdata($data) {
    $$this->_data = $data;
  }

  public function setStatusCode($status) {
    $$this->_statusCode = $status;
  }


   public function send() {
    header("Content-type: application/json;charset=utf-8");
    if($$this->_toCache) {
      header("Cache-Control: max-age=60");
    }else {
      header("Cache-Control: no-cache no-store");
    }
    $this->_responseData = $this->_data;

    echo json_encode($this->responseData);
      }

}
