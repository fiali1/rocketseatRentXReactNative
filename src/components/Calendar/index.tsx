import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  CalendarProps,
  Calendar as CustomCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { useTheme } from 'styled-components';

import { generateInterval } from './generateInterval';
import { ptBr } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface MarkedDatesProps {
  [date: string]: {
    selected: boolean;
    selectedColor: string;
    selectedTextColor: string;
    disabled?: boolean;
    disableTouchableEvent?: boolean;
  };
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_details,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textMonthFontFamily: theme.fonts.secondary_600,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: 15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, MarkedDatesProps, DayProps, generateInterval };
