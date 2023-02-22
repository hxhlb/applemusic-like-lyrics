import { Title } from "@mantine/core";
import * as React from "react";
import {
	SliderConfigComponent,
	SwitchConfigComponent,
} from "./config-components";

export const LyricSettings: React.FC = () => {
	return (
		<>
			<Title order={2}>歌词设置</Title>
			<SwitchConfigComponent
				settingKey="translated-lyric"
				label="显示翻译歌词"
				defaultValue={false}
			/>
			<SwitchConfigComponent
				settingKey="roman-lyric"
				label="显示音译歌词"
				defaultValue={false}
			/>
			<SwitchConfigComponent
				settingKey="dynamic-lyric"
				label="显示逐词歌词（实验性）"
				defaultValue={false}
			/>
			<SwitchConfigComponent
				settingKey="mergeOriginalOnlyLine"
				label="合并没有译文的歌词"
				defaultValue={false}
			/>
			<SliderConfigComponent
				settingKey="globalTimeStampOffset"
				label="全局歌词时序偏移（秒）"
				formatLabel={(v: number) => {
					if (v === 0) {
						return "不调整";
					} else if (v < 0) {
						return `推迟 ${(-v).toFixed(1)} 秒`;
					} else {
						return `提前 ${v.toFixed(1)} 秒`;
					}
				}}
				min={-10}
				step={0.1}
				defaultValue={0}
				max={10}
			/>
			<SwitchConfigComponent
				settingKey="enableEditor"
				label="启用歌词编辑器连接（请勿开启）"
				defaultValue={false}
			/>
		</>
	);
};
