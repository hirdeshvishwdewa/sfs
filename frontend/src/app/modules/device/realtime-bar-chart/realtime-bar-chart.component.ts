// File: src/app/components/realtime-barchart/realtime-barchart.component.ts
import { Component, ElementRef, ViewChild, Input, SimpleChange, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { IDeviceDetail } from '../../shared/shared.model';
import { TranslationObject } from '@ngx-translate/core';

@Component({
  selector: 'app-realtime-barchart',
  templateUrl: './realtime-bar-chart.component.html',
  styleUrls: ['./realtime-bar-chart.component.scss'],
})
export class RealtimeBarchartComponent {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  @Input() data: IDeviceDetail[] = [];
  @Input() translations: TranslationObject = {};

  private svg: any;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private margin = { top: 20, right: 120, bottom: 50, left: 30 };
  private width = 0;
  private height= 0;
  private annimationDuration = 500;

  constructor() { }

  ngAfterViewInit() {
    this.setDimensions();
    this.createChart();
  }

  ngOnChanges(change: SimpleChange) {
    if (!change.firstChange) {
      this.updateChart();
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

    this.yAxis = this.svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.width}, 0)`); // Move Y-axis to the right

    // Label axes
    this.svg
      .append('text')
      .attr('transform', `translate(${this.width / 2}, ${this.height + 50})`)
      .style('text-anchor', 'middle')
      .style('stroke', 'white')
      .text(this.translations['screen.device.labels.graphXAxisLabel']);

    // Add Y-axis label
    this.svg
      .append('text')
      .attr('transform', `translate(${this.width + 45}, ${this.height / 2}) rotate(-90)`)
      .style('text-anchor', 'middle')
      .style('stroke', 'white')
      .text(this.translations['screen.device.labels.graphYAxisLabel']);
  }

  private updateChart(): void {
    if (!this.xScale || !this.yScale) {
      return;
    }
    if (this.data.length > 20) {
      this.data.pop();
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
      .attr('width', 5)
      .attr('height', 0)
      .attr('fill', (d: any) => colorScale(d.status)) // Set bar color based on status
      .transition()
      .duration(this.annimationDuration)
      .attr('y', (d: any) => this.yScale(d.partsPerMinute))
      .attr('height', (d: any) => this.height - this.yScale(d.partsPerMinute));
    // Update existing bars
    bars
      .transition()
      .duration(this.annimationDuration)
      .attr('x', (d: any) => this.xScale(d.timestamp))
      .attr('y', (d: any) => this.yScale(d.partsPerMinute))
      .attr('height', (d: any) => this.height - this.yScale(d.partsPerMinute))
      .attr('fill', (d: any) => colorScale(d.status)); // Update color

    // Remove old bars
    bars.exit().transition().duration(this.annimationDuration).attr('height', 0).attr('y', this.height).remove();

    // Update axes
    this.svg.select('.x-axis').transition().duration(this.annimationDuration)
      .call(
        d3.axisBottom(this.xScale)
        .tickFormat(
          (domainValue: d3.AxisDomain) => d3.timeFormat('%H:%M:%S')(domainValue as Date)
        )
      );
    this.svg.selectAll('.x-axis .tick text')
      .attr('transform', 'rotate(25)')
      .style('text-anchor', 'start')
      .attr('dx', '0.5em')
      .attr('dy', '0.1em');     
    this.svg.select('.y-axis').transition().duration(this.annimationDuration).call(d3.axisRight(this.yScale));
  }

  private redrawChart(): void {
    // Remove existing SVG
    d3.select(this.chartContainer.nativeElement.querySelector('svg')).remove();

    // Recreate the chart
    this.createChart();
    this.updateChart();
  }
  private setDimensions(): void {
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = 200 - this.margin.top - this.margin.bottom;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setDimensions();
    this.redrawChart();
  }
}