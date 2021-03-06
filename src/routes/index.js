import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import QuizInstruction from '../containers/QuizInstruction';

import WelcomePage from '../containers/WelcomePage';
import InvalidToken from '../containers/InvalidToken';
import QuizSummary from '../containers/QuizSummary';
import QuizPlay from '../containers/QuizPlay';

export const publicRoutes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomePage,
  },
  {
    path: '/invalid-token',
    name: 'invalid-token',
    component: InvalidToken,
  },
  { path: '/quiz-summary', name: 'quiz-summary', component: QuizSummary },
];
export const privateRoutes = [
  {
    path: '/quiz-instruction',
    name: 'quiz-instruction',
    component: QuizInstruction,
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizPlay,
  },
  { path: '/quiz-summary', name: 'quiz-summary', component: QuizSummary },
];
export const Routes = (
  <Switch>
    {publicRoutes.map((route) => (
      <PublicRoute
        key={route.name}
        exact={true}
        path={route.path}
        component={route.component}
      />
    ))}
    {privateRoutes.map((route) => (
      <PrivateRoute
        key={route.name}
        path={route.path}
        component={route.component}
      />
    ))}
  </Switch>
);
