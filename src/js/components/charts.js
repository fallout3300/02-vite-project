/**
 * Компонент графиков для страницы "График движения"
 * Использует d3.js для визуализации данных
 */

import * as d3 from 'd3'

// Данные по дням
const data = [
  { day: 1, date: '31.12', distance: 9.45, chv: 2.0, elevation: 134 },
  { day: 2, date: '01.01', distance: 14.7, chv: 3.42, elevation: 141 },
  { day: 3, date: '02.01', distance: 18.3, chv: 4.38, elevation: 69 },
  { day: 4, date: '03.01', distance: 23.1, chv: 5.37, elevation: 188 },
  { day: 5, date: '04.01', distance: 19.9, chv: 4.92, elevation: 428 },
  { day: 6, date: '05.01', distance: 17.0, chv: 3.65, elevation: 265 },
  { day: 7, date: '06.01', distance: 20.4, chv: 4.3, elevation: 412 },
  { day: 8, date: '07.01', distance: 21.8, chv: 4.6, elevation: 470 },
  { day: 9, date: '08.01', distance: 3.27, chv: 0.72, elevation: 37 }
]

/**
 * Инициализация графиков
 */
export function initCharts() {
  const chartsContainer = document.getElementById('charts-container')
  if (!chartsContainer) {
    console.warn('Charts container not found')
    return
  }
  
  renderDistanceChart(chartsContainer)
  renderChvChart(chartsContainer)
  
  console.log('✅ Графики инициализированы')
}

/**
 * Настройки графиков
 */
const config = {
  width: 800,
  height: 400,
  marginTop: 40,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 70,
  colors: {
    distance: '#3b82f6',
    chv: '#10b981',
    grid: '#e2e8f0',
    text: '#64748b',
    tooltip: '#1e293b'
  }
}

/**
 * Рендер графика километража
 */
function renderDistanceChart(container) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft, colors } = config
  
  // Создаём SVG
  const svg = d3.select('#distance-chart')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
  
  // Область построения
  const xScale = d3.scalePoint()
    .domain(data.map(d => `День ${d.day}`))
    .range([marginLeft, width - marginRight])
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.distance) * 1.1])
    .range([height - marginBottom, marginTop])
  
  // Сетка
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(xScale)
      .tickSize(0)
      .tickFormat('')
    )
    .selectAll('line')
    .style('stroke', colors.grid)
    .style('stroke-dasharray', '4,4')
  
  // Ось X
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .style('fill', colors.text)
    .style('font-size', '12px')
  
  // Ось Y
  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(d3.axisLeft(yScale)
      .ticks(8)
      .tickFormat(d => d + ' км')
    )
    .selectAll('text')
    .style('fill', colors.text)
    .style('font-size', '12px')
  
  // Линия графика
  const line = d3.line()
    .x(d => xScale(`День ${d.day}`))
    .y(d => yScale(d.distance))
    .curve(d3.curveMonotoneX)
  
  // Градиент
  const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'distance-gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%')
  
  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', colors.distance)
    .attr('stop-opacity', 0.3)
  
  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', colors.distance)
    .attr('stop-opacity', 0)
  
  // Область под графиком
  const area = d3.area()
    .x(d => xScale(`День ${d.day}`))
    .y0(height - marginBottom)
    .y1(d => yScale(d.distance))
    .curve(d3.curveMonotoneX)
  
  svg.append('path')
    .datum(data)
    .attr('class', 'area')
    .attr('fill', 'url(#distance-gradient)')
    .attr('d', area)
  
  // Линия
  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', colors.distance)
    .attr('stroke-width', 3)
    .attr('d', line)
  
  // Точки
  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(`День ${d.day}`))
    .attr('cy', d => yScale(d.distance))
    .attr('r', 6)
    .attr('fill', colors.distance)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .append('title')
    .text(d => `День ${d.day}: ${d.distance} км`)
  
  // Заголовок
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('fill', colors.tooltip)
    .attr('font-size', '16px')
    .attr('font-weight', '600')
    .text('Километраж по дням (км)')
  
  // Итого
  const totalDistance = d3.sum(data, d => d.distance)
  svg.append('text')
    .attr('x', width - marginRight)
    .attr('y', height - 10)
    .attr('text-anchor', 'end')
    .attr('fill', colors.text)
    .attr('font-size', '12px')
    .text(`Итого: ${totalDistance.toFixed(2)} км`)
}

/**
 * Рендер графика ЧХВ
 */
function renderChvChart(container) {
  const { width, height, marginTop, marginRight, marginBottom, marginLeft, colors } = config
  
  // Создаём SVG
  const svg = d3.select('#chv-chart')
    .append('svg')
    .attr('width', '100%')
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
  
  // Область построения
  const xScale = d3.scalePoint()
    .domain(data.map(d => `День ${d.day}`))
    .range([marginLeft, width - marginRight])
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.chv) * 1.2])
    .range([height - marginBottom, marginTop])
  
  // Сетка
  svg.append('g')
    .attr('class', 'grid')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(xScale)
      .tickSize(0)
      .tickFormat('')
    )
    .selectAll('line')
    .style('stroke', colors.grid)
    .style('stroke-dasharray', '4,4')
  
  // Ось X
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .style('fill', colors.text)
    .style('font-size', '12px')
  
  // Ось Y
  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(d3.axisLeft(yScale)
      .ticks(8)
      .tickFormat(d => formatHours(d))
    )
    .selectAll('text')
    .style('fill', colors.text)
    .style('font-size', '12px')
  
  // Линия графика
  const line = d3.line()
    .x(d => xScale(`День ${d.day}`))
    .y(d => yScale(d.chv))
    .curve(d3.curveMonotoneX)
  
  // Градиент
  const gradient = svg.append('defs')
    .append('linearGradient')
    .attr('id', 'chv-gradient')
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '0%')
    .attr('y2', '100%')
  
  gradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', colors.chv)
    .attr('stop-opacity', 0.3)
  
  gradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', colors.chv)
    .attr('stop-opacity', 0)
  
  // Область под графиком
  const area = d3.area()
    .x(d => xScale(`День ${d.day}`))
    .y0(height - marginBottom)
    .y1(d => yScale(d.chv))
    .curve(d3.curveMonotoneX)
  
  svg.append('path')
    .datum(data)
    .attr('class', 'area')
    .attr('fill', 'url(#chv-gradient)')
    .attr('d', area)
  
  // Линия
  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', colors.chv)
    .attr('stroke-width', 3)
    .attr('d', line)
  
  // Точки
  svg.selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(`День ${d.day}`))
    .attr('cy', d => yScale(d.chv))
    .attr('r', 6)
    .attr('fill', colors.chv)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .append('title')
    .text(d => `День ${d.day}: ${formatHoursFull(d.chv)}`)
  
  // Заголовок
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('fill', colors.tooltip)
    .attr('font-size', '16px')
    .attr('font-weight', '600')
    .text('Чистое ходовое время по дням')
  
  // Итого
  const totalChv = d3.sum(data, d => d.chv)
  svg.append('text')
    .attr('x', width - marginRight)
    .attr('y', height - 10)
    .attr('text-anchor', 'end')
    .attr('fill', colors.text)
    .attr('font-size', '12px')
    .text(`Итого: ${formatHoursFull(totalChv)}`)
}

/**
 * Форматирование времени (часы)
 */
function formatHours(decimalHours) {
  const hours = Math.floor(decimalHours)
  const minutes = Math.round((decimalHours - hours) * 60)
  return minutes === 0 ? `${hours} ч` : `${hours} ч ${minutes} мин`
}

/**
 * Полное форматирование времени
 */
function formatHoursFull(decimalHours) {
  const hours = Math.floor(decimalHours)
  const minutes = Math.round((decimalHours - hours) * 60)
  return `${hours} ч ${minutes} мин`
}
