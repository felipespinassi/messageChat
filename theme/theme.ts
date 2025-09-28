import { createTheme } from "@shopify/restyle";
import { palette } from "./palette";

// Light Theme
export const lightTheme = createTheme({
  colors: {
    success: palette.success,
    gray: palette.gray,
    black: palette.black,
    white: palette.white,
    background: palette.background,
    foreground: palette.foreground,
    muted: palette.muted,
    border: palette.border,
    primary: palette.primary,
    secondary: palette.secondary,
    tertiaty: palette.tertiary,
    destructive: palette.destructive,
    selectedItem: palette.selectedItem,
    none: palette.none,

    // Status Light
    naoCorrelacionadoBackground:
      palette.status.naoCorrelacionado.light.background,
    naoCorrelacionadoText: palette.status.naoCorrelacionado.light.text,
    aprovadoBackground: palette.status.aprovado.light.background,
    aprovadoText: palette.status.aprovado.light.text,
    pendenteBackground: palette.status.pendente.light.background,
    pendenteText: palette.status.pendente.light.text,
    faturadoBackground: palette.status.faturado.light.background,
    faturadoText: palette.status.faturado.light.text,
    canceladoBackground: palette.status.cancelado.light.background,
    canceladoText: palette.status.cancelado.light.text,
    emSeparacaoBackground: palette.status.emSeparacao.light.background,
    emSeparacaoText: palette.status.emSeparacao.light.text,
    temMensagemBackground: palette.status.temMensagem.light.background,
    temMensagemText: palette.status.temMensagem.light.text,
    expedirBackground: palette.status.expedir.light.background,
    expedirText: palette.status.expedir.light.text,
    completoBackground: palette.status.completo.light.background,
    completoText: palette.status.completo.light.text,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 14,
    l: 28,
    xl: 40,
  },

  textVariants: {
    defaults: {
      fontSize: 14,
      lineHeight: 24,
    },
    header: {
      fontSize: 20,
      lineHeight: 40,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    small: {
      fontSize: 12,
      lineHeight: 18,
    },
    button: {
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  colors: {
    success: palette.success,
    gray: palette.gray,
    black: palette.black,
    white: palette.white,
    background: palette.darkBackground,
    foreground: palette.darkForeground,
    muted: palette.darkMuted,
    border: palette.darkBorder,
    primary: palette.primary,
    secondary: palette.secondary,
    tertiaty: palette.tertiary,
    destructive: palette.destructive,
    selectedItem: palette.darkSelectedItem,
    none: palette.none,

    // Status Dark
    naoCorrelacionadoBackground:
      palette.status.naoCorrelacionado.dark.background,
    naoCorrelacionadoText: palette.status.naoCorrelacionado.dark.text,
    aprovadoBackground: palette.status.aprovado.dark.background,
    aprovadoText: palette.status.aprovado.dark.text,
    pendenteBackground: palette.status.pendente.dark.background,
    pendenteText: palette.status.pendente.dark.text,
    faturadoBackground: palette.status.faturado.dark.background,
    faturadoText: palette.status.faturado.dark.text,
    canceladoBackground: palette.status.cancelado.dark.background,
    canceladoText: palette.status.cancelado.dark.text,
    emSeparacaoBackground: palette.status.emSeparacao.dark.background,
    emSeparacaoText: palette.status.emSeparacao.dark.text,
    temMensagemBackground: palette.status.temMensagem.dark.background,
    temMensagemText: palette.status.temMensagem.dark.text,
    expedirBackground: palette.status.expedir.dark.background,
    expedirText: palette.status.expedir.dark.text,
    completoBackground: palette.status.completo.dark.background,
    completoText: palette.status.completo.dark.text,
  },
  spacing: lightTheme.spacing,
  textVariants: lightTheme.textVariants,
});

export type Theme = typeof lightTheme;
