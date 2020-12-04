import { Component, OnInit } from '@angular/core';
import { BASIC_ICONS } from '../basic_icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  icons = []
  currentSize = 0
  search:string;
  resultIcons = {}
  keys = []

  constructor() { }

  ngOnInit() {
    _.each(BASIC_ICONS,(icon, index) => {
      if (icon.indexOf('width') === -1) {
        const re = /<svg/;
        icon =  icon.replace(re, '<svg width="20"')
      }
      const re = /width="[0-9]*(px)?"/i;
      const found = icon.match(re);
      let res = 0
      if (found && found.length > 0) {
        res = +(found[0].split('=')[1].replace('"', '').replace('"', '').replace('px', ''))
      } 
      this.icons.push({
        title: index,
        src: icon,
        width: res
      });
    })
     _.each(this.icons,(icon) => {
       if(!this.resultIcons[icon.width] || (this.resultIcons[icon.width] && !this.resultIcons[icon.width].icons) ) {
        this.resultIcons[icon.width] = {
          icons: [],
          title: icon.width
        }
        this.keys.push(icon.width)
       }
       this.resultIcons[icon.width].icons.push(icon)
    })
    this.keys.sort((a, b) => {
      return a - b;
    });
  }

  changeColor(color: string) {
    // let svgs = document.getElementsByTagName('svg')
    let paths = document.getElementsByTagName('path')
    // _.each(svgs, (el) => {
    //   el.style.fill = color
    // })
    _.each(paths, (el) => {
      el.style.fill = color
    })
  }

}
