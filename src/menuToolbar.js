// @flow
import * as React from "react";
import type {Value, Change} from 'slate';
import styled from 'styled-components';
import {Container} from './components/item';
import FullScreenIcon from './components/fullScreen';

import {AlignCenter, AlignLeft, AlignRight} from '@canner/slate-icon-align';
import Blockquote from '@canner/slate-icon-blockquote';
import Table from '@canner/slate-icon-table';
import CodeBlock from '@canner/slate-icon-codeblock';
import {Header1, Header2, Header3} from '@canner/slate-icon-header';
import Hr from '@canner/slate-icon-hr';
import Image from '@canner/slate-icon-image';
import {Indent, Outdent} from '@canner/slate-icon-indent';
import Link from '@canner/slate-icon-link';
import {OlList, UlList} from '@canner/slate-icon-list';
import Undo from '@canner/slate-icon-undo';
import Redo from '@canner/slate-icon-redo';
import {TerminalIcon} from './components/terminal/terminalIcon';
import {CloudwareIcon} from './components/cloudware/cloudwareIcon';
import {ImageIcon} from './components/image/imageIcon';


type Props = {
  value: Value,
  isFull?: boolean,
  onChange: (change: Change) => void,
  goFull: () => void,
  serviceConfig: any
}

const IconContainer = styled.div`
  display: inline-block;
  background: transparent;
  color: #222;
  cursor: pointer;
  -webkit-transition: background 0.2s ease 0s;
  border-bottom: 0.5px solid #ebebeb;

  &:hover {
    background: #ebebeb;
  }
`

const Seperator = styled.div`
  height: 35px;
  width: 1px;
  margin: 2px 0;
  background: #ebebeb;
  display: inline-block;
  vertical-align: top;
`;

export default class Toolbar extends React.Component<Props> {
  render() {
    const { value, onChange, goFull, isFull, serviceConfig } = this.props;

    const options = [
      Undo,
      Redo,
      'seperator',
      Header1,
      Header2,
      Header3,
      Blockquote,
      Hr,
      'seperator',
      AlignLeft,
      AlignCenter,
      AlignRight,
      Indent,
      Outdent,
      'seperator',
      OlList,
      UlList,
      'seperator',
      Link,
      CodeBlock,
      Table,
      'ImageIcon',
      'seperator',
      'TerminalIcon',
      'CloudwareIcon',
    ]
    /*
      Video,
      FontColor,
      FontBgColor,
      'seperator',*/

    return (
      <Container>
        {options.map((Type, i) => {
          if (Type === 'seperator')
            return <Seperator key={i}/>
          if (Type === 'fullScreen') {
            return (
              <IconContainer
                key={i}>
                <FullScreenIcon className="__canner-editor_topToolbarItem" goFull={goFull} isFull={isFull}/>
              </IconContainer>
            )
          }
          if(Type === 'TerminalIcon'){
            return(
              <IconContainer
                key={i}>
                <TerminalIcon
                  className="__canner-editor_topToolbarItem"
                  change={value.change()}
                  onChange={onChange}
                />
              </IconContainer>
            )
          }
          if(Type === 'CloudwareIcon'){
            return(
              <IconContainer
                key={i}>
                <CloudwareIcon
                  className="__canner-editor_topToolbarItem"
                  change={value.change()}
                  onChange={onChange}
                />
              </IconContainer>
            )
          }
          if(Type === 'ImageIcon'){
            return(
              <IconContainer
                key={i}>
                <ImageIcon
                  className="__canner-editor_topToolbarItem"
                  change={value.change()}
                  onChange={onChange}
                />
              </IconContainer>
            )
          }

          // special plugin
          if (Type === 'image') {
            Type = Image
          }

          return (
            <IconContainer
              key={i}>
              <Type
                change={value.change()}
                onChange={onChange}
                className="__canner-editor_topToolbarItem"
                disableClassName="__canner-editor_topToolbarItemDisabled"
                strokeClassName="qlStroke"
                serviceConfig={Type === 'image' && serviceConfig}
                strokeMitterClassName="qlStrokeMitter"
                fillClassName="qlFill"
                evenClassName="qlEven"
                colorLabelClassName="qlColorLabel"
                thinClassName="qlThin"
                activeStrokeMitterClassName="qlStrokeMitterActive"
                activeClassName="__canner-editor_topToolbarItem __canner-editor_topToolbarItemActive"
                activeStrokeClassName="qlStrokeActive"
                activeFillClassName="qlFillActive"
                activeThinClassName="qlThinActive"
                activeEvenClassName="qlEvenActive"
              />
            </IconContainer>
          )
        })}
      </Container>
    );
  }
}
