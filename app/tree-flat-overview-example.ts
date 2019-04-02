import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


export class ItemNode {
  id?: string;
  children?: ItemNode[];
  name: string;  
}

/** Flat node with expandable and level information */
export class ItemFlatNode {
  constructor(
    public expandable: boolean,
    public filename: string,
    public level: number,    
    public id: string
  ) { }
}


const TREE_DATA = [
  {
    name: 'Welcome word',    
  }, {
    name: 'How do they do it?',    
  },
  {
    name: 'Do you want to learn more?',
    children: [
      {
        name: 'The most important secret',        
      }, 
      {
        name: 'Way to success',
      }
    ]
  }, {
    name: 'Per aspera ad astra',    
  }, {
    name: 'Listen and repeat',    
  },

];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.scss'],
})
export class TreeFlatOverviewExample {
  private transformer = (node: ItemNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */