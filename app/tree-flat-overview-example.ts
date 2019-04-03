import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


export class ItemNode {
  id: number;
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
    id: 1,
    name: 'Welcome word',    
  }, {
    id: 2,
    name: 'How do they do it?',    
  },
  {
    id: 3,
    name: 'Do you want to learn more?',
    children: [
      {
        id: 4,
        name: 'The most important secret',        
      }, 
      {
        id: 5,
        name: 'Way to success',
      }
    ]
  }, {
    id: 6,
    name: 'Per aspera ad astra',    
  }, {
    id: 7,
    name: 'Listen and repeat',    
  },

];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  id: number;
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
      id: node.id,
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

  public drop(event) {
    console.log('Previous index:', event.previousIndex);    
    console.log('Current index:', event.currentIndex);    
    console.log('Is pointer over container? ', event.isPointerOverContainer);
    console.log(this.dataSource);

    // debugger;
  }

  move(
    cdkDragMoved
  ) {
    console.log(cdkDragMoved.source.element);    
  }
    
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */