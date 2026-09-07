import {loadFont as loadSans} from '@remotion/google-fonts/DMSans';
import {loadFont as loadMono} from '@remotion/google-fonts/DMMono';

// DESIGN §2: DM Sans for UI/headings/body, DM Mono for all code.
export const {fontFamily: sans} = loadSans();
export const {fontFamily: mono} = loadMono();
