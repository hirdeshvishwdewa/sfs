// File: src/app/components/realtime-barchart/realtime-barchart.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, SimpleChange } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { IDeviceDetail } from '../../shared/shared.model';

@Component({
  selector: 'app-realtime-barchart',
  templateUrl: './realtime-bar-chart.component.html',
  styleUrls: ['./realtime-bar-chart.component.scss'],
})
export class RealtimeBarchartComponent implements OnInit, OnDestroy {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  @Input() data: IDeviceDetail[] = [];

  private svg: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private eventSubscription!: Subscription;
  private margin = { top: 20, right: 90, bottom: 50, left: 50 };
  private width = window.innerWidth - this.margin.left - this.margin.right;
  private height = 200 - this.margin.top - this.margin.bottom;

  constructor() {}

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(change: SimpleChange) {
    if (!change.firstChange) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;

    // Create SVG container
    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // X scale: Time
    this.xScale = d3.scaleTime().range([0, this.width]);

    // Y scale: Parts Per Minute (PPM)
    this.yScale = d3.scaleLinear().range([this.height, 0]);

    // X axis
    this.xAxis = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', 'x-axis');

    // Y axis
    this.yAxis = this.svg.append('g').attr('class', 'y-axis');

    // Label axes
    this.svg
      .append('text')
      .attr('transform', `translate(${this.width / 2}, ${this.height + 40})`)
      .style('text-anchor', 'middle')
      .style('stroke', 'white')
      .text('Time');

    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left)
      .attr('x', -this.height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('stroke', 'white')
      .text('Parts Per Minute (PPM)');
  }

  private updateChart(): void {
    if (!this.xScale || !this.yScale) {
      return;
    }
    if (this.data.length > 18) {
      this.data.splice(0, 1);
    }
    const now = new Date();
    const past = new Date(now.getTime() - 60000); // Show last 60 seconds
    this.xScale.domain([past, now]);
    this.yScale.domain([0, d3.max(this.data, (d) => d.partsPerMinute) || 0]);

    // Define a color scale or conditional colors
    const colorScale = d3.scaleOrdinal()
      .domain(['running', 'stopped', 'maintenance'])
      .range(['var(--running)', 'var(--stopped)', 'var(--maintenance)']);

    const bars = this.svg.selectAll('.bar').data(this.data, (d: any) => d.timestamp);

    // Enter new bars
    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.xScale(d.timestamp))
      .attr('y', this.height)
      .attr('width', 10)
      .attr('height', 0)
      .attr('fill', (d: any) => colorScale(d.status)) // Set bar color based on status
      .transition()
      .duration(500)
      .attr('y', (d: any) => this.yScale(d.partsPerMinute))
      .attr('height', (d: any) => this.height - this.yScale(d.partsPerMinute));

    // Update existing bars
    bars
      .transition()
      .duration(500)
      .attr('x', (d: any) => this.xScale(d.timestamp))
      .attr('y', (d: any) => this.yScale(d.partsPerMinute))
      .attr('height', (d: any) => this.height - this.yScale(d.partsPerMinute))
      .attr('fill', (d: any) => colorScale(d.status)); // Update color

    // Remove old bars
    bars.exit().transition().duration(500).attr('height', 0).attr('y', this.height).remove();

    // Update axes
    this.svg.select('.x-axis').transition().duration(500).call(d3.axisBottom(this.xScale));
    this.svg.select('.y-axis').transition().duration(500).call(d3.axisLeft(this.yScale));
  }

}