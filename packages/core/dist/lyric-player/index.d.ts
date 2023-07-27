/**
 * @fileoverview
 * 一个播放歌词的组件
 * @author SteveXMH
 */
import type { Disposable, HasElement, LyricLine } from "../interfaces";
import { SpringParams } from "../utils/spring";
/**
 * 歌词播放组件，本框架的核心组件
 *
 * 尽可能贴切 Apple Music for iPad 的歌词效果设计，且做了力所能及的优化措施
 */
export declare class LyricPlayer extends EventTarget implements HasElement, Disposable {
    private element;
    private currentTime;
    private lyricLines;
    private processedLines;
    private lyricLinesEl;
    private lyricLinesSize;
    private hotLines;
    private bufferedLines;
    private scrollToIndex;
    private resizeObserver;
    private posXSpringParams;
    private posYSpringParams;
    private scaleSpringParams;
    private enableBlur;
    private interludeDots;
    private interludeDotsSize;
    readonly supportPlusLighter: boolean;
    readonly supportMaskImage: boolean;
    private disableSpring;
    private alignAnchor;
    readonly size: [number, number];
    readonly pos: [number, number];
    /**
     * 设置是否使用物理弹簧算法实现歌词动画效果，默认启用
     *
     * 如果启用，则会通过弹簧算法实时处理歌词位置，但是需要性能足够强劲的电脑方可流畅运行
     *
     * 如果不启用，则会回退到基于 `transition` 的过渡效果，对低性能的机器比较友好，但是效果会比较单一
     */
    setEnableSpring(enable?: boolean): void;
    /**
     * 获取当前是否启用了物理弹簧
     * @returns 是否启用物理弹簧
     */
    getEnableSpring(): boolean;
    readonly style: import("jss").StyleSheet<"lyricPlayer" | "lyricLine" | "@media (max-width: 1024px)" | "lyricDuetLine" | "lyricBgLine" | "lyricMainLine" | "lyricSubLine" | "disableSpring" | "interludeDots" | "@supports (mix-blend-mode: plus-lighter)" | "tmpDisableTransition">;
    private onPageShow;
    constructor();
    /**
     * 获取当前播放时间里是否处于间奏区间
     * 如果是则会返回单位为毫秒的始末时间
     * 否则返回 undefined
     *
     * 这个只允许内部调用
     * @returns [开始时间,结束时间] 或 undefined 如果不处于间奏区间
     */
    getCurrentInterlude(): [number, number, number] | undefined;
    /**
     * 重建样式
     *
     * 这个只允许内部调用
     */
    rebuildStyle(): void;
    /**
     * 设置是否启用歌词行的模糊效果
     * @param enable 是否启用
     */
    setEnableBlur(enable: boolean): void;
    /**
     * 设置当前播放歌词，要注意传入后这个数组内的信息不得修改，否则会发生错误
     * @param lines 歌词数组
     */
    setLyricLines(lines: LyricLine[]): void;
    /**
     * 重新布局定位歌词行的位置，调用完成后再逐帧调用 `update`
     * 函数即可让歌词通过动画移动到目标位置。
     *
     * 此函数还有一个 `reflow` 参数，用于指定是否需要重新计算布局
     *
     * 因为计算布局必定会导致浏览器重排布局，所以会大幅度影响流畅度和性能，故请只在以下情况下将其​设置为 true：
     *
     * 1. 歌词页面大小发生改变时（这个组件会自行处理）
     * 2. 加载了新的歌词时（不论前后歌词是否完全一样）
     * 3. 用户自行跳转了歌曲播放位置（不论距离远近）
     *
     * @param reflow 是否进行重新布局（重新计算每行歌词大小）
     */
    calcLayout(reflow?: boolean): void;
    /**
     * 获取当前歌词的播放位置
     *
     * 一般和最后调用 `setCurrentTime` 给予的参数一样
     * @returns 当前播放位置
     */
    getCurrentTime(): number;
    /**
     * 获取当前歌词数组
     *
     * 一般和最后调用 `setLyricLines` 给予的参数一样
     * @returns 当前歌词数组
     */
    getLyricLines(): LyricLine[];
    getElement(): HTMLElement;
    /**
     * 设置歌词行的对齐方式，默认为 `top`
     *
     * - 设置成 `top` 的话歌词将会向组件顶部对齐
     * - 设置成 `bottom` 的话歌词将会向组件底部对齐
     * - 设置成 [0.0-1.0] 之间任意数字的话则会根据当前组件高度从顶部向下位移为对齐位置垂直居中对齐
     * @param alignAnchor 歌词行对齐方式，详情见函数说明
     */
    setAlignAnchor(alignAnchor: "top" | "bottom" | number): void;
    /**
     * 设置当前播放进度，单位为毫秒且**必须是整数**，此时将会更新内部的歌词进度信息
     * 内部会根据调用间隔和播放进度自动决定如何滚动和显示歌词，所以这个的调用频率越快越准确越好
     *
     * 调用完成后，可以每帧调用 `update` 函数来执行歌词动画效果
     * @param time 当前播放进度，单位为毫秒
     */
    setCurrentTime(time: number, isSeek?: boolean): void;
    /**
     * 更新动画，这个函数应该被逐帧调用或者在以下情况下调用一次：
     *
     * 1. 刚刚调用完设置歌词函数的时候
     * @param delta 距离上一次被调用到现在的时长，单位为毫秒（可为浮点数）
     */
    update(delta?: number): void;
    /**
     * 设置所有歌词行在横坐标上的弹簧属性，包括重量、弹力和阻力。
     *
     * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
     */
    setLinePosXSpringParams(params: Partial<SpringParams>): void;
    /**
     * 设置所有歌词行在​纵坐标上的弹簧属性，包括重量、弹力和阻力。
     *
     * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
     */
    setLinePosYSpringParams(params: Partial<SpringParams>): void;
    /**
     * 设置所有歌词行在​缩放大小上的弹簧属性，包括重量、弹力和阻力。
     *
     * @param params 需要设置的弹簧属性，提供的属性将会覆盖原来的属性，未提供的属性将会保持原样
     */
    setLineScaleSpringParams(params: Partial<SpringParams>): void;
    dispose(): void;
}