<?php
/*
 * Copyright (C) 2013 pingworks - Alexander Birk und Christoph Lukas
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

class ContentController extends Zend_Rest_Controller
{
	public function init()
	{
		$this->_helper->viewRenderer->setNoRender(true);
	}
	
	private function getEmptyResult()
	{
		return array(
				'success' => true,
				'results' => array()
		);
	}
	
	public function indexAction() 
	{
		$regex =$this->getInvokeArg('bootstrap')->getOption('paramregex');
		$data = $this->getEmptyResult();
		$data['results'] = Application_Model_ContentPeer::getAllContents();
		$this->getResponse()->setBody(json_encode($data));
		$this->getResponse()->setHttpResponseCode(200);
	}

	public function getAction() 
	{
		$regex =$this->getInvokeArg('bootstrap')->getOption('paramregex');
		//if (preg_match($regex['contentid'], $this->_getParam('id')) === 0)
		//	throw new Exception('Illegal Content Id.');
		if (preg_match("^(latest|[0-9]+)$", $this->_getParam('id')) === 0)
			throw new Exception('Illegal Content Id.');
		$version = $this->_getParam('id');
		
		$data = $this->getEmptyResult();
		$data['results'] = Application_Model_ContentPeer::getContentForVersion($version);
		$this->getResponse()->setBody(json_encode($data));
		$this->getResponse()->setHttpResponseCode(200);
	}

	public function headAction() 
	{}

	public function postAction() 
	{}

	public function putAction() 
	{}

	public function deleteAction() 
	{}
}